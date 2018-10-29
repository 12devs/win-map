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

    const { point } = this.props;
    const stationsData = this.props.stationsData;
    const dist = this.props.scaleWind;
    const history = _.get(stationsData, [point.station_id, 'history'], {});
    const arr = Object.keys(history);
    const max = Math.max(..._.values(history));
    const k = dist / max;
    return (
      <div>
        {arr.map((direction, i) => {
          return (<SectorPolygon key={i} color="purple" point={point} dist={history[direction] * k}
                                 direction={direction}/>)
        })}
      </div>
    )
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

export default connect(mapStateToProps, actions)(WindRose);
