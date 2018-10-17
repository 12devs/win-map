import React from 'react';
import { Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';
import Danger from './Danger';
import UserPlace from './UserPlace';

class Markers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Markers this.props.points.toJS()', this.props.points.toJS());
    return (
      <div>
        {this.props.points.map((point, id) => {
          if (point.get('type') === 'Danger') {
              return <Danger key={id} point={point.toJS()}/>;
            }
            else {
              return <UserPlace key={id} point={point.toJS()}/>;
            }
          }
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(Markers);
