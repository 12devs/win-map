import React, { Component } from 'react';
import { calcMapRegionOne } from './utils';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Modal,
  Alert,
  TouchableHighlight
} from 'react-native';
import actions from "./actions";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';

class PointSettings extends Component {

  render() {
    const { point, type } = this.props.info;
    const show = !!(point && type);

    if (!show) {
      return null;
    }

    return (
      <Modal
        style={styles.container}
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          this.props.updateReduxState({ info: { point: null, type: null } });
        }}>
        <View style={{ marginTop: 22 }}>
          <Text>Name: {point.name}</Text>
          <Text>Type: {type}</Text>
          <Text>Lat: {point.lat}</Text>
          <Text>Lng: {point.lng}</Text>
          <WindRoseChart stationId={point.station_id}/>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={
              () => {
                const mapRegion = calcMapRegionOne(point);
                if (mapRegion) {
                  this.props.updateReduxState({ mapRegion, info: { point: null, type: null } });
                }
              }
            }>
            <Text style={styles.submitButtonText}>Go to marker</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 25,
    height: 40,
    // flex: 1,
  },
});
