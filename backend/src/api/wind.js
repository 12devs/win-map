import rp from 'request-promise';
import moment from 'moment';
import fs from 'fs';
import { Point, Account, Danger, Place, Subscription, Notification, Station } from './../models';
import { Wind } from "../models";

const getStationId = (location) => {
  let stationData;
  return new Promise(resolve => {
    const options = {
      uri: `https://api-ak.wunderground.com/api/d8585d80376a429e/conditions/labels/lang:EN/units:metric/bestfct:1/v:2.0/q/${location.lat},${location.lng}.json`,
      json: true
    };
    rp(options)
      .then(data => {
        stationData = data.current_observation.station.id;
        const info = {
          direction: data.current_observation.wind_dir,
          speed: data.current_observation.wind_speed,
          station_id: data.current_observation.station.id,
          lat: location.lat,
          lng: location.lng
        };
        return Station.update(info, { where: { station_id: info.station_id } })
          .then(res => {
            if (!res[0]) {
              return Station.create(info)
            }
          })
          .then(() => {
            return resolve(stationData);
          })
      })
      .catch(err => resolve('not Found'));
  });
};

const getCurrenData = async (stationId) => {
  if (stationId === 'not Found'){
    return {}
  }
  const { lat, lng } = await Station.findOne({ where: { station_id: stationId } });
  return new Promise(resolve => {
    const options = {
      uri: `https://api-ak.wunderground.com/api/d8585d80376a429e/conditions/labels/lang:EN/units:metric/bestfct:1/v:2.0/q/${lat},${lng}.json`,
      json: true
    };
    rp(options)
      .then(data => {
        return resolve({
          direction: data.current_observation.wind_dir,
          speed: data.current_observation.wind_speed,
          station_id: stationId
        });
      })
      .catch(err => resolve({}));
  })
};

const getHistoricalData = async (stationId, days = 1) => {
  if (stationId === 'not Found'){
    return { history: {}, current: {}, period: 0 }
  }
  const currentMoment = moment();
  const end = currentMoment.format('YYYYMMDD');
  const start = currentMoment.subtract(days, 'days').format('YYYYMMDD');

  const options = {
    uri: `https://api-ak.wunderground.com/api/606f3f6977348613/history_${start}${end}/units:metric/v:2.0/q/pws:${stationId}.json?showObs=0`,
    json: true
  };
  let data = await rp(options);

  let count = 0;
  if (!data.history) {
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
        windRose[key]++;
      }
    }

  });

  for (let key in windRose) {
    windRose[key] = Number((windRose[key] * 100 / data.history.days.length).toFixed(2));
    count += windRose[key];
  }

  return ({ history: windRose, current: currentWind, period: data.history.days.length });
};

const getDailyHistoricalData = async (stationId, days = 1) => {
  let time = new Date();
  const { lat, lng } = await Station.findOne({ where: { station_id: stationId } });
  const currentMoment = moment();
  const end = currentMoment.format('YYYYMMDD');
  const start = currentMoment.subtract(days, 'days').format('YYYYMMDD');
  const yearly = [];
  const options = {
    uri: `https://api-ak.wunderground.com/api/606f3f6977348613/history_${start}${end}/units:metric/v:2.0/q/${lat},${lng}.json`,
    // uri: `https://api-ak.wunderground.com/api/606f3f6977348613/history_2017102420181024/units:metric/v:2.0/q/51.536459320055805,-0.13938903808593753.json`,
    json: true
  };
  let data = await rp(options);
  fs.writeFileSync('res.json', JSON.stringify(data, null, 4));
  if ((!data.history) || data.history.days.length === 0) {
    return ({ history: {}, current: {}, period: 0 });
  }

  const period = data.history.days.length;

  const { wind_dir, wind_speed } = (data.history || {}).days[period - 1].observations[data.history.days[period - 1].observations.length - 1];
  const currentWind = { dir: wind_dir, speed: wind_speed };

  data.history.days.forEach(item => {
    const dailyFreq = item.observations.reduce((acc, el) => {
      acc[el.wind_dir] = (acc[el.wind_dir] || 0) + 1;
      return acc;
    }, {});

    const keysSorted = Object.keys(dailyFreq).sort((a, b) => dailyFreq[b] - dailyFreq[a]);
    yearly.push(keysSorted[0]);
  });

  const windRose = yearly.reduce((acc, el) => {
    if (el)
      acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  return ({ current: currentWind });
};

module.exports = {
  getHistoricalData,
  getStationId,
  getCurrenData,
  getDailyHistoricalData
};
