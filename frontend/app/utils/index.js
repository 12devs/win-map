import geolib from "geolib";

const calcBoundsAll = (points) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (minLat && maxLat && minLng && maxLng) {
      return [[minLat + Math.random()/1000000, minLng], [maxLat, maxLng]];
    } else {
      throw new Error('cannot get bounds')
    }
  } catch (err) {
    return [[50.505, -29.09], [52.505, 29.09]]
  }
};

const calcBoundsOne = (points) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (minLat && maxLat && minLng && maxLng) {
      return [[minLat + Math.random()/1000000, minLng], [maxLat, maxLng]];
    } else {
      throw new Error('cannot get bounds')
    }
  } catch (err) {
    return [[50.505, -29.09], [52.505, 29.09]]
  }
};

export {
  calcBoundsAll
}
