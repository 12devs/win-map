import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import UserPlace from './UserPlace';
import { StyleSheet, Text, View } from 'react-native';
import Danger from './Danger';
import SectorPolygon from './SectorPolygon';


class Markers extends React.Component {

  render() {
    return (
      <View>
        {this.props.places.map((point, id) => {
          return <UserPlace key={id} point={point} showInfo={this.showInfo}/>;
        })}
        {this.props.dangers.map((point, id) => {
          return <Danger key={id} point={point} showInfo={this.showInfo}/>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
});
