import React, { Component } from 'react';
import { StyleSheet, Slider, } from 'react-native';
import actions from "../../actions/index";
import { connect } from "react-redux";

class Navigation extends Component {

  change(value) {
    this.props.updateReduxState({ scaleWind: parseFloat(value) });
  }

  render() {
    return (
      <Slider
        minimumTrackTintColor={'#3D6DCC'}
        thumbTintColor={'#00498f'}
        style={styles.submitButton}
        step={1}
        maximumValue={1000000}
        onValueChange={this.change.bind(this)}
        value={this.props.scaleWind}
      />
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
    scaleWind: state.get('scaleWind'),
  };
}

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    margin: 5,
    height: 30,
  },

});
