const sideOfTheWorld = [
  { side: 'North', degrees: 0 },
  { side: 'NNE', degrees: 22.5 },
  { side: 'NE', degrees: 45 },
  { side: 'ENE', degrees: 67.5 },
  { side: 'East', degrees: 90 },
  { side: 'ESE', degrees: 112.5 },
  { side: 'SE', degrees: 135 },
  { side: 'SSE', degrees: 157.5 },
  { side: 'South', degrees: 180 },
  { side: 'SSW', degrees: 202.5 },
  { side: 'SW', degrees: 225 },
  { side: 'WSW', degrees: 247.5 },
  { side: 'West', degrees: 270 },
  { side: 'WNW', degrees: 292.5 },
  { side: 'NW', degrees: 315 },
  { side: 'NNW', degrees: 337.5 },
  { side: 'North', degrees: 360 },
];

const roundValue = (value, digits) => {

  return parseFloat(value.toFixed(digits));
}

const toRadians = (degrees) => {

  return degrees * Math.PI / 180;
}

const toDegrees = (radians) => {

  return radians * 180 / Math.PI;
}

const bearing = (locationFirst, locationSecond) => {

  const startLat = toRadians(locationFirst.lat);
  const startLng = toRadians(locationFirst.lng);
  const destLat = toRadians(locationSecond.lat);
  const destLng = toRadians(locationSecond.lng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);

  const brng = toDegrees(Math.atan2(y, x));

  return (brng + 360) % 360;
}

const distance = (locationFirst, locationSecond) => {

  const lat1 = toRadians(locationFirst.lat);
  const lat2 = toRadians(locationSecond.lat);
  const theta = toRadians(locationFirst.lng - locationSecond.lng);

  let dist = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(theta);

  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
}

export {
  sideOfTheWorld,
  roundValue,
  distance,
  bearing,
}
