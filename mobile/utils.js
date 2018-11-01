import geolib from "geolib";

const calcMapRegionAll = (points) => {
  try {
    const { latitude, longitude } = geolib.getCenterOfBounds(points);
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (latitude && longitude && minLat && maxLat && minLng && maxLng) {
      return {
        latitude,
        longitude,
        latitudeDelta: Math.abs(maxLat - minLat),
        longitudeDelta: Math.abs(maxLng - minLng),
      };
    }
  } catch (err) {
    return null
  }
};

const calcMapRegionOne = (point) => {
  try {
    const points = [0, 90, 180, 270].map(bearing => {
      return geolib.computeDestinationPoint(point, 5000, bearing);
    });
    return calcMapRegionAll(points)
  } catch (err) {
    return null
  }
};

export {
  calcMapRegionAll,
  calcMapRegionOne
}
