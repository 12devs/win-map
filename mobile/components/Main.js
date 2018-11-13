import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import Map from './Map';
import services from "../services/index";
import AddPoint from './AddPoint';
import PointSettings from './PointSettings';
import { calcMapRegionAll } from '../utils';

class Main extends Component {

  componentDidMount = () => {
    return services.getInfo()
      .then(res => {
        if (res.unauthorized) {
          return this.props.navigation.navigate('Login')
        }
        const mapRegion = calcMapRegionAll([...res.places, ...res.dangers]);
        if (mapRegion) {
          res.mapRegion = mapRegion
        }
        return this.props.updateReduxState(res)
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Map style={styles.map}/>
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

export default connect(mapStateToProps, actions)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {}
});