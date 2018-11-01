import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import Markers from './markers/Markers';
import actions from './actions';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';



const screen = Dimensions.get('window');

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onClick = (e) => {
    console.log('werf', e.nativeEvent.coordinate);
  };

  render() {
    const ASPECT_RATIO = 10;
    const LATITUDE = 53.78825;
    const LONGITUDE = 24.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    return (
      <MapView
        onPress={(e) => {
          console.log({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude });
          this.props.updateReduxState({
            savePointSettings: {
              show: true,
              latlng: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
            }
          });
          Actions.AddPoint()
        }}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Markers/>
      </MapView>
    );
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
