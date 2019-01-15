import request from 'request-promise';
import scrapeIt from 'scrape-it';

const url = 'https://www.meteoblue.com/en/weather/forecast/modelclimate/';

const getCityDataUrl = (lat, lng) => {
  return new Promise((resolve) => {
    request(`https://www.meteoblue.com/en/server/search/query3?query=${lat},${lng}`)
      .then(response => resolve(JSON.parse(response).results[0].url))
      .catch(err => resolve(err));
  });
};

const getWindRoseUrl = q => {
  return new Promise((resolve) => {
    scrapeIt(`${url}${q}`, {
      WindRoseUrl: {
        selector: '#wrapper-main > div.main.clearfix > main > div > div:nth-child(9)> div > div',
        attr: 'data-url'
      },
    })
      .then(async ({ data, response }) => {
        if (response.statusCode !== 200) throw new Error(response.statusCode);
        else resolve(data.WindRoseUrl);
      })
      .catch((e) => {
        resolve({ done: false, err: `Couldn't scrape`, url: doc.loc, response: e });
      });
  });
};

const getData = url => {
  return new Promise((resolve) => {
    request(`https:${url}`)
      .then(response => resolve(response))
      .catch(err => resolve(err));
  });
};

const historyData = data => {
  let winds = [];
  let period = 0;
  const labels = data.xAxis.categories;
  let history = {};

  data.series.forEach(el => {
    winds = el.data.map((e, i) => {
      period += e;
      if (!winds[i])
        return e;
      return e + winds[i];
    });
  });

  winds = winds.forEach((el, i) => {
    history[labels[i]] = Number((el * 100 / period).toFixed(2));
  });

  return { history, period: Number((period / 24).toFixed()) };
};

const getWindRoseData = async (lat, lng) => {
  try {
    const cityDataUrl = await getCityDataUrl(lat, lng);
    const windRoseUrl = await getWindRoseUrl(cityDataUrl);
    let windRoseData = await getData(windRoseUrl);
    const { history, period } = await historyData(JSON.parse(windRoseData));
    windRoseData = JSON.parse(windRoseData);
    windRoseData.credits.text = 'highcharts.com';
    windRoseData.tooltip.shared = false;
    // windRoseData.chart.zoomType= 'Xy';
    // windRoseData.chart.alignTicks = true;
    // windRoseData.legend.margin = 0;
    windRoseData.legend.itemDistance = 2;
    windRoseData.chart.zoomType = 'Xy';
    return ({ history, period, windRoseData });
  } catch (err) {
    return ({ history: {}, period: 0, windRoseData: {} });
  }
};

export default getWindRoseData;
