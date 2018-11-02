import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapView, { ProviderPropType, Marker, AnimatedRegion, Callout } from 'react-native-maps';
import Markers from './markers/Markers';
import actions from './actions';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import GPlaces from './GPlaces';

const screen = Dimensions.get('window');
import Navigation from "./Navigation";

const remote = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00OTcuOTEzLDQ5Ny45MTNjLTE4Ljc4MiwxOC43ODItNDkuMjI1LDE4Ljc4Mi02OC4wMDgsMGwtODQuODYyLTg0Ljg2M2MtMzQuODg5LDIyLjM4Mi03Ni4xMywzNS43MTctMTIwLjY1OSwzNS43MTcgIEMxMDAuNDY5LDQ0OC43NjcsMCwzNDguMzEyLDAsMjI0LjM4M1MxMDAuNDY5LDAsMjI0LjM4NCwwYzEyMy45MzEsMCwyMjQuMzg0LDEwMC40NTIsMjI0LjM4NCwyMjQuMzgzICBjMCw0NC41MTQtMTMuMzUyLDg1Ljc3MS0zNS43MTgsMTIwLjY3Nmw4NC44NjMsODQuODYzQzUxNi42OTUsNDQ4LjcwNCw1MTYuNjk1LDQ3OS4xMzEsNDk3LjkxMyw0OTcuOTEzeiBNMjI0LjM4NCw2NC4xMDkgIGMtODguNTExLDAtMTYwLjI3NCw3MS43NDctMTYwLjI3NCwxNjAuMjczYzAsODguNTI2LDcxLjc2NCwxNjAuMjc0LDE2MC4yNzQsMTYwLjI3NGM4OC41MjUsMCwxNjAuMjczLTcxLjc0OCwxNjAuMjczLTE2MC4yNzQgIEMzODQuNjU3LDEzNS44NTYsMzEyLjkwOSw2NC4xMDksMjI0LjM4NCw2NC4xMDl6Ii8+PC9zdmc+';

class Map extends Component {

  constructor() {
    super();
    this.state = {
      onSearch: false
    };
  }

  onPress = () => {

    this.setState({ onSearch: !this.state.onSearch });
  };

  render() {

    const ASPECT_RATIO = 10;
    const mapPadding = 50;
    const LATITUDE = 53.78825;
    const LONGITUDE = 24.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    return (
      <View style={styles.container}>
        <MapView
          onPress={(e) => {
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
          region={this.props.mapRegion}
          mapPadding={{
            top: mapPadding * 2,
            right: mapPadding,
            bottom: mapPadding,
            left: mapPadding
          }}
          mapType={this.props.mapViewType || 'standard'}
        >
          <Markers/>
        </MapView>
        <Callout>
          <Navigation/>
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
    mapRegion: state.get('mapRegion'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    mapViewType: state.get('mapViewType'),
  };
}

export default connect(mapStateToProps, actions)(Map);

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 0,
    paddingBottom: 0,
    margin: 10,
    marginRight: 50,
    flexDirection: "row",
    backgroundColor: 'white'
  },
  calloutView: {
    flexDirection: "row",
    // justifyContent: 'right',
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    // marginTop: 20,
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
  },
  nav: {
    // maxHeight: '40%',
    flex: 2,
  }
});
