import { getHistoricalData, getWindDirections } from '../api/wind';

const pointStatistics = (req, res) => {

  const { loc1, loc2 } = req.params;

  if (!loc1 && !loc2) {

    return res.status(400).json({ message: 'Required params are missing' });
  }

  const locations1 = loc1.split(',');
  const locations2 = loc2.split(',');

  getWindDirections({ lat: locations1[0], lng: locations1[1] }, { lat: locations2[0], lng: locations2[1] })
    .then(data => {

      console.log(data);
    });

  getHistoricalData({ lat: 29.884318, lng: -95.382293 }, 365)
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
