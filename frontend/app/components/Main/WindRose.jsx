import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import SectorPolygon from './SectorPolygon';
import _ from 'lodash';

class WindRose extends React.Component {
  constructor() {
    super();
  }

  render() {

    const { point, zoom, scaleWind, stationsData } = this.props;

    let size;
    if (zoom > 6){
      size = Math.pow(2, 18 - zoom)
    } else {
      size = Math.pow(2, 12)
    }

    const dist = scaleWind * size;
    const history = _.get(stationsData, [point.station_id, 'history'], {});
    const arr = Object.keys(history);
    const max = Math.max(..._.values(history));
    const k = dist / max;
    return (
      <div>
        {arr.map((direction, i) => {
          return (<SectorPolygon simple={true} key={i} color="purple" point={point} dist={history[direction] * k}
                                 direction={direction}/>)
        })}
      </div>
    )
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

export default connect(mapStateToProps, actions)(WindRose);
