import {
  historicPollenIndex,
  currentWeather,
  minMaxTemperatureAndRainfall,
  ozoneData,
  COData,
  pollenIndex,
  aqiIndex,
  getPhoto,
  apiWaqiInfo,
  historicTemperatureAndHumidity,
  getHistoricalData,
} from "./../api/DataForCity";
import emailExistence from 'email-existence';
import { getCurrentLocation } from '../api/location';
import { Email } from './../models';

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, function (error, response) {
      console.log(email, error, response);
      if (error || (!response)) {
        return reject(new Error(`email ${email} doesn't exist`))
      } else {
        return Email.findOrCreate({
          where: { email },
          defaults: { email, created_at: new Date(), updated_at: new Date() }
        })
          .then(() => {
            return resolve(true)
          })
          .catch(err => {
            console.log(err);
            return reject(err)
          })
      }
    });
  })
};

export default {

  async cityPageData(req, res) {
    try {
      const { code } = req.params;
      const location = await getCurrentLocation(code);
      const promises = [
        historicPollenIndex(code),
        currentWeather(code),
        minMaxTemperatureAndRainfall(location),
        ozoneData(location),
        COData(location),
        pollenIndex(code),
        aqiIndex(location),
        getPhoto(location),
        apiWaqiInfo(location),
        // historicTemperatureAndHumidity(code),
        getHistoricalData(location),
      ];
      return Promise.all(promises)
        .then(result => {
          const data = {
            Code: code,
            Name: location.name,
            location
          };
          result.forEach(elem => {
            Object.assign(data, elem);
          });
          return res.status(200).json(data)
        })
        .catch(err => {
          console.log(1, err);
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}
