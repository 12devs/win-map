import * as Cron from "cron";
import script from "./scripts";

const { CronJob, CronTime } = Cron;

const runScript = () => {
  return script.createAndSendNotifications();
};

const job = new CronJob('0 0 * * * *', runScript);

const stop = () => {
  return job.stop();
};

const start = () => {
  return job.start();
};

const setTime = (time) => {
  try {
    const cronTime = new CronTime(time);
    job.setTime(cronTime);
    return job.start();
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  stop,
  start,
  setTime,
  runScript
}
