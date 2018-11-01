import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Navigation from "./Navigation";
import actions from './actions';
import { connect } from "react-redux";
import Map from './Map';
import AddPoint from './AddPoint';
import PointSettings from './PointSettings';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };


  render() {
    return (
      <View style={styles.container}>
        <Navigation/>
        <Map/>
       {/* <ScrollView>
          <Text>{JSON.stringify(this.props.savePointSettings, null, 4)}</Text>
          <Text>{JSON.stringify(this.props.places, null, 4)}</Text>
          <Text>{JSON.stringify(this.props.dangers, null, 4)}</Text>
        </ScrollView>*/}
        <AddPoint/>
        <PointSettings/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    info: state.get('info'),

  };
}

export default connect(mapStateToProps, actions)(Login);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    maxHeight: '40%',
    flex: 10,
  }
});
