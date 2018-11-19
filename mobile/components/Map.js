import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PROVIDER_DEFAULT } from 'react-native-maps';
import MapView, { ProviderPropType, Callout } from 'react-native-maps';
import Markers from './markers/Markers';
import actions from '../actions/index';
import { connect } from "react-redux";
import Navigation from "./mapTools/Navigation";
import Search from './mapTools/Search';
import Slider from './mapTools/Slider';
import MapViewType from './mapTools/MapViewType';

const screen = Dimensions.get('window');

class Map extends Component {

  render() {

    const ASPECT_RATIO = 10;
    const mapPadding = 50;
    const LATITUDE = 53.78825;
    const LONGITUDE = 24.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const initialRegion = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    return (
      <View style={styles.container}>
        <MapView
          onPress={(e) => {
            const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate;
            this.props.updateReduxState({
              savePointSettings: {
                show: true,
                latlng: { lat, lng }
              },
            });
            this.props.navigation.navigate('AddPoint');
          }}
          onRegionChangeComplete={(mapRegion) => {
            this.props.updateReduxState({ tempRegion: mapRegion });
          }}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={initialRegion}
          region={this.props.mapRegion || initialRegion}
          mapPadding={{
            top: mapPadding * 2,
            right: mapPadding,
            bottom: mapPadding,
            left: mapPadding
          }}
          mapType={this.props.mapViewType || 'standard'}
        >
          <Markers navigation={this.props.navigation}/>
        </MapView>
        <Callout>
          <Navigation/>
        </Callout>
        <Callout style={{ bottom: 0, width: screen.width }}>
          <Slider/>
        </Callout>
        <Callout style={styles.submitButton}>
          <MapViewType/>
        </Callout>
        <Callout style={{ top: 0 }}>
          <Search/>
        </Callout>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapRegion: state.get('mapRegion'),
    mapViewType: state.get('mapViewType'),
  };
}

export default connect(mapStateToProps, actions)(Map);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    flex: 10,
  },
  submitButton: {
    margin: 5,
    marginTop: 70,
    right: 0,
  },
});
