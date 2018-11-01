import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native';
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
      <View style={styles.container}>
        <Navigation/>
        <Text>Name: {point.name}</Text>
        <Text>Type: {type}</Text>
        <Text>Lat: {point.lat}</Text>
        <Text>Lng: {point.lng}</Text>
        <WindRoseChart stationId={point.station_id}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(PointSettings);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  }
});
