import geolib from "geolib"
import { Platform } from "react-native"

const getArrMinMaxCount = (min, max, n) => {
  const step = (max - min) / (n + 1)
  const arr = []
  for (let i = 0; i < n + 2; i++) {
    arr.push(min + step * i)
  }
  return arr
}

const getCorrectDirection = (dir) => {
  dir = dir % 360
  if (dir < 0) {
    return dir + 360
  }
  return dir
}

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
}

const computeDestinationPoint = (start, distance, bearing) => {
  const { lat, lng } = start

  const radius = 6371000

  const b = distance / radius // angular distance in radians
  const Q = bearing * Math.PI / 180

  const f1 = lat * Math.PI / 180
  const l1 = lng * Math.PI / 180

  const f2 = Math.asin(Math.sin(f1) * Math.cos(b) +
    Math.cos(f1) * Math.sin(b) * Math.cos(Q))
  const l2 = l1 + Math.atan2(Math.sin(Q) * Math.sin(b) * Math.cos(f1),
    Math.cos(b) - Math.sin(f1) * Math.sin(f2))
  return {
    latitude: f2 * 180 / Math.PI,
    longitude: l2 * 180 / Math.PI
  }
}

const getPolygon = (point, dist, direction, a) => {
  const angle = sectors[direction]
  if (!angle && angle !== 0) {
    return []
  }
  const angles = getArrMinMaxCount(-a + angle, a + angle, 0)
  const correctAngles = angles.map(elem => getCorrectDirection(elem))
  const result = []

  correctAngles.forEach(bearing => {
    const p = computeDestinationPoint(point, dist, bearing)
    result.push({
      latitude: p.latitude,
      longitude: p.longitude,
    })
  })

  result.push({
    latitude: point.lat,
    longitude: point.lng,
  })

  return result
}

const calcMapRegionAll = (points) => {
  try {
    const { latitude, longitude } = geolib.getCenterOfBounds(points)
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points)
    if (latitude && longitude && minLat && maxLat && minLng && maxLng) {
      return {
        latitude,
        longitude,
        latitudeDelta: Math.abs(maxLat - minLat),
        longitudeDelta: Math.abs(maxLng - minLng),
      }
    }
  } catch (err) {
    return null
  }
}

const calcMapRegionOne = (point) => {
  try {
    const points = [0, 90, 180, 270].map(bearing => {
      return geolib.computeDestinationPoint(point, 200, bearing)
    })
    return calcMapRegionAll(points)
  } catch (err) {
    return null
  }
}

export {
  calcMapRegionAll,
  calcMapRegionOne,
  getArrMinMaxCount,
  getCorrectDirection,
  computeDestinationPoint,
  getPolygon,
}
