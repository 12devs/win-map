import React from 'react';
import _ from 'lodash';
import { Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import { getPolygon, getArrMinMaxCount } from './../../utils';
import { View } from "react-native";

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
      const angles = getArrMinMaxCount(0, 12.5, 100);
      const dists = getArrMinMaxCount(0, dist, 100);
      try {
        return (
          <View>
            {angles.map((angle, i) => {
              const positions = getPolygon(point, dists[i], direction, angle);
              return (
                <Polygon
                  // lineCap={'round'}
                  key={i}
                  coordinates={positions}
                  strokeWidth={0}
                  strokeColor={'rgba(95, 87, 202, 0.7)'}
                  fillColor={'rgba(95, 87, 202, 0.02)'}
                />
              )
            })}
          </View>
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
  };
}

export default connect(mapStateToProps, actions)(SectorPolygon);
