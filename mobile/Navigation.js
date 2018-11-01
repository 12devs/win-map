import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import actions from "./actions";
import { connect } from "react-redux";
import { calcMapRegionAll } from './utils';

class Navigation extends Component {

  render() {
    return (
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

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => console.log('Subscription')
          }>
          <Text style={styles.submitButtonText}>Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => console.log('Map View')
          }>
          <Text style={styles.submitButtonText}>Map View</Text>
        </TouchableOpacity>
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
  };
}

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 25,
    height: 40,
    // flex: 1,
  },
  submitButtonText: {
    color: 'white'
  }
});
