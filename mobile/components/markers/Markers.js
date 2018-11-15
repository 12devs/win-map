import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import UserPlace from './UserPlace';
import { View } from 'react-native';
import Danger from './Danger';


class Markers extends React.Component {

  render() {
    return (
      <View>
        {this.props.places.map((point, id) => {
          return <UserPlace key={id} point={point} showInfo={this.showInfo} navigation={this.props.navigation}/>;
        })}
        {this.props.dangers.map((point, id) => {
          return <Danger key={id} point={point} showInfo={this.showInfo} navigation={this.props.navigation}/>;
        })}
      </View>
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
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
  };
}

export default connect(mapStateToProps, actions)(Markers);
