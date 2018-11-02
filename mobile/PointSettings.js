import React, { Component } from 'react';
import { calcMapRegionOne } from './utils';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import actions from "./actions";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';
import services from './services';
import Button from './Button';

class PointSettings extends Component {
  constructor() {
    super();
    this.delMarker = this.delMarker.bind(this);
  }

  delMarker() {
    const { point, type } = this.props.info;
    const { id } = point;
    return services.deletePoint({
      [type]: { id },
    })
      .then(res => {
        if (type === 'place') {
          const places = this.props.places.filter(el => !(el.id === id));
          this.props.updateReduxState({ places });
        }
        if (type === 'danger') {
          const dangers = this.props.dangers.filter(el => !(el.id === id));
          this.props.updateReduxState({ dangers });
        }
      });
  };

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
          <Button
            label='Go to marker'
            onPress={() => {
              const mapRegion = calcMapRegionOne(point);
              if (mapRegion) {
                this.props.updateReduxState({ mapRegion, info: { point: null, type: null } });
              }
            }}/>
          <Button
            label='Remove point'
            onPress={() => {
              this.delMarker()
                .then(() => {
                  this.props.updateReduxState({ info: { point: null, type: null } });
                });
            }}/>
        </View>
      </Modal>
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

export default connect(mapStateToProps, actions)(PointSettings);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  button: {
    margin: 20
  }
});
