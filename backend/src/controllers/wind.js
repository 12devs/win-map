import { getHistoricalData } from '../api/wind';

const pointStatistics = (req, res) => {

  getHistoricalData({ lat: 29.884318, lng: -95.382293}, 365)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
    });

}

export {
  pointStatistics,
}
