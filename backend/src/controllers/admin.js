import models from './../models';
import cronJob from './../cronJob';

export default {

  async dbExecute(req, res) {
    try {
      const { model, method, args } = req.body;
      await models[model][method](...args)
        .then(result => {
          return res.status(200).json(result);
        })

    } catch (err) {

      return res.status(500).json({ error: err.message });
    }
  },

  async stopCron(req, res) {
    try {
      cronJob.stop();
      return res.status(200).json({ status: 'Ok' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async startCron(req, res) {
    try {
      cronJob.start();
      return res.status(200).json({ status: 'Ok' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async setTimeCron(req, res) {
    try {
      const { time } = req.query;
      console.log(time);
      cronJob.setTime(time);
      return res.status(200).json({ status: 'Ok' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async runScript(req, res) {
    try {
      await cronJob.runScript();
      return res.status(200).json({ status: 'Ok' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
}
