import fetch from "node-fetch";
import config from 'config';
import { apiWaqiInfo, aqiIndex, getPhoto, pollenIndex } from "./DataForCity";

const darksky_api_key = config.get('darksky.api_key');

const getCityInfoByCodeAndLocation = (code, location, name) => {
  const promises = [
    dailyOzone(location),
    pollenIndex(code),
    aqiIndex(location),
    apiWaqiInfo(location)
      .then(apiWaqiInfo => ({
        pm25: apiWaqiInfo.apiWaqiInfo.pm25,
        o3: apiWaqiInfo.apiWaqiInfo.o3,
      })),
    getPhoto(location),
  ];

  return Promise.all(promises)
    .then(result => {
      const data = {
        Code: code,
        Name: name || location.name,
      };
      result.forEach(elem => {
        Object.assign(data, elem);
      });
      return data;
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Cannot get for code ${code}`)
    })
};

const dailyOzone = (location) => {
  const { lat, lng } = location;
  const url = `https://api.darksky.net/forecast/${darksky_api_key}/${lat},${lng}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      const { ozone } = res.currently;

      return { Ozone: ozone };
    })
    .catch(() => ({}));
};

export {
  dailyOzone,
  getCityInfoByCodeAndLocation
}
