import { getCityInfoByCodeAndLocation } from '../api/MainData';
import { getCurrentLocation, getNearbyCities, getCurrentZipCode } from '../api/location';
import config from 'config';

export default {

  async mainPageData(req, res) {

    const { codes } = req.query;
    const stubCodes = ['77001', '94177', '90024', '98093', '33101', '02101'];
    let data;

    try {
      if (!codes) {
        let ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(7);
        if (config.demoIP){
          ip = config.demoIP;
        }
        const cityLocations = await getNearbyCities(ip);
        if (!cityLocations.length) {
          throw Error('not city')
        }

        data = cityLocations.map(async location => {
          const {code, name} = await getCurrentZipCode(location);
          return getCityInfoByCodeAndLocation(code, location, name);
        });
      }
      else {
        const zipCodes = codes.split(',');
        data = zipCodes.map(async code => {
          const location = await getCurrentLocation(code);
          return getCityInfoByCodeAndLocation(code, location);
        });
      }
    } catch (err) {
      data = stubCodes.map(async code => {
        const location = await getCurrentLocation(code);
        return getCityInfoByCodeAndLocation(code, location);
      });
    }

    return Promise.all(data)
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.message });
      });
  }
}
