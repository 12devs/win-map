import fetch from "node-fetch";
import config from 'config';

const google_api_key = config.get('google.api_key');

const getCurrentLocation = zipCode => {

  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zipCode}&key=${google_api_key}`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {

      if (res.status !== 'OK') return Promise.reject(new Error(`Zip code ${zipCode} not found`));  //@TODO null ?
      if (!res.results.length) return Promise.reject(new Error(`Zip code ${zipCode} not found`));  //@TODO null ?

      const currentResult = res.results[0];
      const { location } = currentResult.geometry;

      const currentLocation = {
        lat: (location.lat).toFixed(8),
        lng: (location.lng).toFixed(8),
        name: currentResult.formatted_address.replace(', USA', ''),
        // name: currentResult.formatted_address.replace(', USA', '') + ' ' + ((currentResult.postcode_localities || [])[0] || "") ,
        xxxx: res,
      };

      return Promise.resolve(currentLocation);
    })
    .catch(err => Promise.reject(err));
};

const getNearbyCities = (ip) => {
  const url = `http://getnearbycities.geobytes.com/GetNearbyCities?radius=70&locationcode=${ip}&limit=6&minradius=2`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {

      const result = [];
      if (res.length > 6) res.length = 6;

      res.forEach(city => {
        if (city.length) {
          result.push({
            name: city[1],
            lat: city[8],
            lng: city[10],
          });
        }
      });

      return result;
    });
};

const getCurrentZipCode = (location) => {

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${google_api_key}&result_type=postal_code`;

  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      if (!res.results) return null;
      const currentResult = res.results[0];
      const address_components = res.results[0].address_components;
      const index = address_components.findIndex(item => {
        if (!item.types.length) return false;

        return item.types[0] === "postal_code";
      });

      return index === -1 ? null : { code: address_components[index].long_name, name: currentResult.formatted_address.replace(', USA', '')}
    });
};

export {
  getCurrentLocation,
  getNearbyCities,
  getCurrentZipCode,
}
