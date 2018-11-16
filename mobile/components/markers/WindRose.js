import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import SectorPolygon from './SectorPolygon';
import { View } from 'react-native';
import _ from 'lodash';

class WindRose extends React.Component {
  constructor() {
    super();
  }

  render() {

    const { point } = this.props;
    const stationsData = this.props.stationsData;
    const dist = this.props.scaleWind;
    const history = _.get(stationsData, [point.station_id, 'history'], {});
    const arr = Object.keys(history);
    const max = Math.max(..._.values(history));
    const k = dist / max;
    return (
      <View>
        {arr.map((direction, i) => {
          return (<SectorPolygon key={i} point={point} dist={history[direction] * k}
                                 direction={direction}/>)
        })}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    scaleWind: state.get('scaleWind'),
  };
}

export default connect(mapStateToProps, actions)(WindRose);
