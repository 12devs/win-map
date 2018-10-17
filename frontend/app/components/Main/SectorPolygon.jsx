import React from 'react';
import { Polygon } from 'react-leaflet';
import { connect } from 'react-redux';
import actions from './../../actions';
import geolib from 'geolib';

const sectors = {
  N: [348.75, 11.5],
  NNE: [11.5, 33.75],
  NE: [33.75, 56.25],
  ENE: [56.25, 78.75],
  E: [78.75, 101.25],
  ESE: [101.25, 123.75],
  SE: [123.75, 146.25],
  SSE: [146.25, 168.75],
  S: [168.75, 191.25],
  SSW: [191.25, 213.75],
  SW: [213.75, 236.25],
  WSW: [236.25, 258.75],
  W: [258.75, 281.25],
  WNW: [281.25, 303.75],
  NW: [303.75, 326.25],
  NNW: [326.25, 348.75],
};

const getPolygon = (point, dist, direction) => {
  const result = [point];
  sectors[direction].forEach(bearing => {
    const p = geolib.computeDestinationPoint(point, dist, bearing);
    result.push({
      lat: p.latitude,
      lng: p.longitude,
    })
  });
  return result
};

class SectorPolygon extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { point, dist, direction } = this.props;
    const positions = getPolygon(point, dist, direction);
    return (
      <Polygon color="purple" positions={positions}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    points: state.get("points"),
    stations: state.get("stations"),
    stationsData: state.get("stationsData"),
    markerType: state.get("markerType"),
    viewType: state.get("viewType"),
    actionType: state.get("actionType"),
  };
}

export default connect(mapStateToProps, actions)(SectorPolygon);
