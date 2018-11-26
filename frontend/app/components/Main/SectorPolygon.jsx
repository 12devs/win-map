import React from 'react';
import { Polygon } from 'react-leaflet';
import { connect } from 'react-redux';
import actions from './../../actions';
import { getPolygon, getArrMinMaxCount, getCorrectDirection } from './../../utils';

class SectorPolygon extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { point, zoom, stationsData } = this.props;
    let size;
    if (zoom > 6) {
      size = Math.pow(2, 18 - zoom)
    } else {
      size = Math.pow(2, 12)
    }

    let dist;
    if (this.props.dist || this.props.dist === 0) {
      dist = this.props.dist;
    } else {
      dist = point.dangerRadius || 5000
    }
    const direction = this.props.direction || _.get(stationsData, [point.station_id, 'current', 'dir'], null);
    if (direction) {
      const angles = getArrMinMaxCount(0, 12.5, 100);
      const dists = getArrMinMaxCount(0, dist, 100);
      try {
        return (
          <div>
            {angles.map((angle, i) => {
              const positions = getPolygon(point, dists[i], direction, angle);
              return (
                <Polygon
                  key={i}
                  color="#5F57CA"
                  weight={0}
                  // fill={false}
                  positions={positions}
                  fillOpacity={0.02}
                />
              )
            })}
          </div>
        )
      } catch (err) {
        return null
      }
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    scaleWind: state.get('scaleWind'),
    zoom: state.get('zoom'),
  };
}

export default connect(mapStateToProps, actions)(SectorPolygon);
