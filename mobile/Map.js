import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, TextInput } from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapView, { ProviderPropType, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import Markers from './markers/Markers';
import actions from './actions';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import GPlaces from './GPlaces';

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
      <View style={styles.container}>
        <MapView
          loadingEnabled={true}
          onPress={(e) => {
            console.log({ lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude });
            this.props.updateReduxState({
              savePointSettings: {
                show: true,
                latlng: { lat: e.nativeEvent.coordinate.latitude, lng: e.nativeEvent.coordinate.longitude }
              }
            });
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
        <Callout style={{ width: '100%' }}>
          <View style={styles.calloutView}>
            <GPlaces/>
          </View>
        </Callout>
      </View>
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
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  },
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    // maxHeight: '40%',
    flex: 10,
  }
});
