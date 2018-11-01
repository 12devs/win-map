import React from 'react';
import _ from 'lodash';
import { Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import actions from '../actions/index';

const sectors = {
  North: [348.75, 11.5],
  N: [348.75, 11.5],
  NNE: [11.5, 33.75],
  NE: [33.75, 56.25],
  ENE: [56.25, 78.75],
  East: [78.75, 101.25],
  E: [78.75, 101.25],
  ESE: [101.25, 123.75],
  SE: [123.75, 146.25],
  SSE: [146.25, 168.75],
  South: [168.75, 191.25],
  S: [168.75, 191.25],
  SSW: [191.25, 213.75],
  SW: [213.75, 236.25],
  WSW: [236.25, 258.75],
  West: [258.75, 281.25],
  W: [258.75, 281.25],
  WNW: [281.25, 303.75],
  NW: [303.75, 326.25],
  NNW: [326.25, 348.75],
};

const computeDestinationPoint = (start, distance, bearing) => {

  const {lat, lng} = start;

  const radius = 6371000;

  const b = distance/ radius; // angular distance in radians
  const Q = bearing * Math.PI / 180;

  const f1 = lat * Math.PI / 180;
  const l1 = lng * Math.PI / 180;

  const f2 = Math.asin(Math.sin(f1) * Math.cos(b) +
    Math.cos(f1) * Math.sin(b) * Math.cos(Q));
  const l2 = l1 + Math.atan2(Math.sin(Q) * Math.sin(b) * Math.cos(f1),
    Math.cos(b) - Math.sin(f1) * Math.sin(f2));

  return {
    latitude: f2 * 180 / Math.PI,
    longitude: l2 * 180 / Math.PI
  };
};

const getPolygon = (point, dist, direction) => {
  const result = [{latitude: point.lat, longitude: point.lng}];
  if (sectors[direction]) {
    sectors[direction].forEach(bearing => {
      const p = computeDestinationPoint(point, dist, bearing);
      result.push({
        latitude: p.latitude,
        longitude: p.longitude,
      })
    });
  }
  return result
};

class SectorPolygon extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { point } = this.props;
    const stationsData = this.props.stationsData;
    let dist;
    if (this.props.dist || this.props.dist === 0) {
      dist = this.props.dist;
    } else {
      dist = this.props.scaleWind;
    }
    const direction = this.props.direction || _.get(stationsData, [point.station_id, 'current', 'dir'], null);
    if (direction) {
      const positions = getPolygon(point, dist, direction);
      console.log('pos', positions);
      return (
        <Polygon
          coordinates={positions}
        />
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    scaleWind: state.get('scaleWind'),
  };
}

export default connect(mapStateToProps, actions)(SectorPolygon);
