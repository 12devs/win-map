import request from 'request-promise';
import scrapeIt from 'scrape-it';

const url = 'https://www.meteoblue.com/en/weather/forecast/modelclimate/';

const getCityDataUrl = (lat = 53, lng = 20) => {
  return new Promise((resolve) => {
    request(`https://www.meteoblue.com/en/server/search/query3?query=${lat},${lng}`)
      .then(response => resolve(JSON.parse(response).results[0].url))
      .catch(err => resolve(err));
  });
};

const getWindRoseUrl = (q) => {
  return new Promise((resolve) => {
    scrapeIt(`${url}${q}`, {
      WindRoseUrl: {
        selector: '#wrapper-main > div.main.clearfix > main > div > div:nth-child(9)> div > div',
        attr: 'data-url'
      },
    })
      .then(async ({data, response}) => {
        if (response.statusCode !== 200) throw new Error(response.statusCode);
        else resolve(data.WindRoseUrl);
      })
      .catch((e) => {
        resolve({done: false, err: `Couldn't scrape`, url: doc.loc, response: e});
      });
  });
};

const getData = (url) => {
  return new Promise((resolve) => {
    request(`https:${url}`)
      .then(response => resolve(response))
      .catch(err => resolve(err));
  });
};

const getWindRoseData = async (lat = 53, lng = 50) => {
  const cityDataUrl = await getCityDataUrl(lat, lng);
  const windRoseUrl = await getWindRoseUrl(cityDataUrl);
  const windRoseData = await getData(windRoseUrl);
  console.log((cityDataUrl));
  return JSON.parse(windRoseData);
};

// getWindRoseData()
//   .then(res=>{
//     console.log(res);
//   })

export default getWindRoseData
