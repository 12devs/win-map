import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage, Slider } from 'react-native'
import actions from "./actions";
import { connect } from "react-redux";
import { calcMapRegionAll } from './utils';
import MapViewType from "./MapViewType";

class Navigation extends Component {

  change(value) {
    this.props.updateReduxState({ scaleWind: parseFloat(value) })
  }

  render() {
    return (
      <View style={{ flexDirection: 'column', flex:1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => {
                const mapRegion = calcMapRegionAll([...this.props.places, ...this.props.dangers]);
                if (mapRegion) {
                  this.props.updateReduxState({ mapRegion })
                }
              }}>
            <Text style={styles.submitButtonText}>All Markers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => {
                if (this.props.viewType === 'Current') {
                  this.props.updateReduxState({ viewType: 'Historical' })
                } else {
                  this.props.updateReduxState({ viewType: 'Current' })
                }
              }
            }>
            <Text style={styles.submitButtonText}>View Type</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => console.log('Notifications')
            }>
            <Text style={styles.submitButtonText}>Notifications</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => console.log('Subscription')
            }>
            <Text style={styles.submitButtonText}>Subscription</Text>
          </TouchableOpacity>

          <MapViewType style={styles.submitButton}/>

          <Slider
            style={styles.submitButton}
            step={1}
            maximumValue={10000000}
            onValueChange={this.change.bind(this)}
            value={this.props.scaleWind}
          />
        </View>
      </View>
    )
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
    scaleWind: state.get('scaleWind'),
  };
}

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    width:400,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
    flex:1
  },
  submitButtonText: {
    color: 'white'
  }
});
