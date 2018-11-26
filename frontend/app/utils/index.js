import geolib from "geolib";

const getArrMinMaxCount = (min, max, n) => {
  const step = (max - min) / (n + 1);
  const arr = [];
  for (let i = 0; i < n + 2; i++) {
    arr.push(min + step * i);
  }
  return arr
};
const getCorrectDirection = (dir) => {
  dir = dir % 360;
  if (dir < 0) {
    return dir + 360
  }
  return dir
};

const sectors = {
  North: 0,
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  East: 90,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  South: 180,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  West: 270,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

const calcBoundsAll = (points) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (minLat && maxLat && minLng && maxLng) {
      return [[minLat + Math.random() / 1000000, minLng], [maxLat, maxLng]];
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
      return [[minLat + Math.random() / 1000000, minLng], [maxLat, maxLng]];
    } else {
      throw new Error('cannot get bounds')
    }
  } catch (err) {
    return [[50.505, -29.09], [52.505, 29.09]]
  }
};


const computeDestinationPoint = (start, distance, bearing) => {
  const { lat, lng } = start;

  const radius = 6371000;

  const b = distance / radius; // angular distance in radians
  const Q = bearing * Math.PI / 180;

  const f1 = lat * Math.PI / 180;
  const l1 = lng * Math.PI / 180;

  const f2 = Math.asin(Math.sin(f1) * Math.cos(b) +
    Math.cos(f1) * Math.sin(b) * Math.cos(Q));
  const l2 = l1 + Math.atan2(Math.sin(Q) * Math.sin(b) * Math.cos(f1),
    Math.cos(b) - Math.sin(f1) * Math.sin(f2));
  return {
    lat: f2 * 180 / Math.PI,
    lng: l2 * 180 / Math.PI
  };
};

const getPolygon = (point, dist, direction, a) => {
  direction = sectors[direction];
  if (!direction && direction !== 0) {
    console.log('Uncoreect direction');
    return []
  }
  const center = computeDestinationPoint(point, dist, direction);
  const point1 = computeDestinationPoint(point, 2.5, direction);
  const angles = getArrMinMaxCount(-90 + direction, 90 + direction, 0);
  const correctAngles = angles.map(elem => getCorrectDirection(elem));
  const result = [];

  correctAngles.forEach(bearing => {
    const p = computeDestinationPoint(center, dist * Math.sin(a * Math.PI / 180), bearing);
    result.push({
      lat: p.lat,
      lng: p.lng,
    })
  });
  getArrMinMaxCount(-90 + direction + 180, 90 + direction + 180, 3).map(elem=>getCorrectDirection(elem)).forEach(bearing => {
    const p = computeDestinationPoint(point1, 2.5, bearing);
    result.push({
      lat: p.lat,
      lng: p.lng,
    })
  });

  return result
};

export {
  calcBoundsAll,
  calcBoundsOne,
  getArrMinMaxCount,
  getCorrectDirection,
  computeDestinationPoint,
  getPolygon,
}

