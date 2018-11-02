import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from "react-native";
import actions from "./actions";
import { connect } from "react-redux";

class MapViewType extends Component {

  render() {
    const radio_props = [
      { label: 'standard', value: 'standard' },
      { label: 'satellite', value: 'satellite' },
      { label: 'hybrid', value: 'hybrid' },
    ];
    return (
      <RadioForm
        radio_props={radio_props}
        initial={0}
        onPress={(value) => {
          this.props.updateReduxState({ mapViewType: value })
        }}
        // style={{ width: 100 }}
      />
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
    mapRegion: state.get('mapRegion'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    mapViewType: state.get('mapViewType'),
  };
}

export default connect(mapStateToProps, actions)(MapViewType);

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
  submitButtonText: {
    color: 'white'
  }
});
