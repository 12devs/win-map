import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import Danger from './Danger';
import UserPlace from './UserPlace';

class Markers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.places.map((point, id) => {
          return <UserPlace key={id} point={point.toJS()}/>;
        })}
        {this.props.dangers.map((point, id) => {
          return <Danger key={id} point={point.toJS()}/>;
        })}
      </div>
    );
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
  };
}

export default connect(mapStateToProps, actions)(Markers);
