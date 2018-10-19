import rp from 'request-promise';
import moment from 'moment';
import { bearing, distance, sideOfTheWorld } from "./util";

const getStationId = (location) => {
  return new Promise(resolve => {
    const options = {
      uri: `https://api-ak.wunderground.com/api/d8585d80376a429e/conditions/labels/lang:EN/units:english/bestfct:1/v:2.0/q/${location.lat},${location.lng}.json`,
      json: true
    };
    rp(options)
      .then(data => {
        return resolve(data.current_observation.station.id)
      })
      .catch(err => resolve({}));
  })
};

const getHistoricalData = async (stationId, days = 365) => {
  const currentMoment = moment();
  const end = currentMoment.format("YYYYMMDD");
  const start = currentMoment.subtract(days, 'days').format("YYYYMMDD");

  const options = {
    uri: `https://api-ak.wunderground.com/api/606f3f6977348613/history_${start}${end}/units:metric/v:2.0/q/pws:${stationId}.json?showObs=0`,
    json: true
  };
  let data = await rp(options);
  let count = 0;
  if (!data.history) {
    console.log(data);
    return ({ history: {}, current: {}, period: 0 });
  }
  const currentWind = {
    dir: (data.history || {}).days[data.history.days.length - 1].summary.wind_dir,
    speed: data.history.days[data.history.days.length - 1].summary.wind_speed,
  };

  const windRose = {
    North: 0,
    NNE: 0,
    NE: 0,
    ENE: 0,
    East: 0,
    ESE: 0,
    SE: 0,
    SSE: 0,
    South: 0,
    SSW: 0,
    SW: 0,
    WSW: 0,
    West: 0,
    WNW: 0,
    NW: 0,
    NNW: 0
  };

  data.history.days.forEach(item => {
    const { summary } = item;

    for (let key in windRose) {
      if (key === summary.wind_dir) {
        windRose[key]++
      }
    }

  });

  for (let key in windRose) {
    windRose[key] = Number((windRose[key] * 100 / data.history.days.length).toFixed(2));
    count += windRose[key];
  }

  return ({ history: windRose, current: currentWind, period: data.history.days.length });
};

module.exports = {
  getHistoricalData,
  getStationId,
};
