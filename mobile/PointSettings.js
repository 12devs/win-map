import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Navigation from "./Navigation";
import actions from "./actions";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';

class PointSettings extends Component {

  render() {
    const { point, type } = this.props.info;

    if (!(point && type)) {
      return null;
    }
    return (
      <View style = {styles.container}>
        <Navigation/>
          <Text style = {styles.submitButtonText}> {JSON.stringify(this.props.savePointSettings, null, 4)} </Text>
          <Text style = {styles.submitButtonText}> pointSettings </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => Actions.Main()
          }>
          <Text style={styles.submitButtonText}>Close</Text>
        </TouchableOpacity>
        <WindRoseChart stationId={point.station_id}/>
      </View>
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
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    savePointSettings: state.get('savePointSettings'),
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(PointSettings);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    // flex:1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
  },
  submitButtonText:{
    color: 'black'
  }
});
