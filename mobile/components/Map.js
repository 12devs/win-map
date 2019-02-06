import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  PermissionsAndroid
} from 'react-native'
import { PROVIDER_DEFAULT } from 'react-native-maps'
import MapView, { ProviderPropType, Callout, AnimatedRegion } from 'react-native-maps'
import Markers from './markers/Markers'
import actions from '../actions/index'
import { connect } from "react-redux"
import Navigation from "./mapTools/Navigation"
import Search from './mapTools/Search'
import Slider from './mapTools/Slider'
import MapViewType from './mapTools/MapViewType'
import DeleteMarkers from './mapTools/DelAllMarkers'
import hasItem from "../utils/asyncStorage"
import { watchPosition } from "../utils/utils"
import Permissions from 'react-native-permissions'

const { width, height } = Dimensions.get('window')

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      latitude: 53.78825,
      longitude: 30.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.1,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: 53.78825,
        longitude: 30.4324
      }),
      layout: {
        height: height,
        width: width,
      },
      isLogo: true,
    }
  }

  requestLocationPermission = async () => {
    const { coordinate, routeCoordinates, distanceTravelled } = this.state

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      const position = await watchPosition(coordinate, routeCoordinates, distanceTravelled, granted)

      this.setState({ ...position })

    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount = async () => {
    const { coordinate, routeCoordinates, distanceTravelled } = this.state

    if (Platform.OS === 'android') {
      await this.requestLocationPermission()
    } else {
      const granted = await Permissions.check('location')

      this.setState({ ...await watchPosition(coordinate, routeCoordinates, distanceTravelled, granted) })
    }

    hasItem('isLogo').then(isLogo => {
      this.setState({ isLogo })
    })
  }

  getMapRegion = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state
    return ({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    })
  }

  onLayout = event => {
    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      }
    })
  }

  render() {
    const { viewType } = this.props
    const { layout, isLogo } = this.state
    const { width, height } = layout
    const mapPadding = 50

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <MapView
          onPress={(e) => {
            const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate
            this.props.updateReduxState({
              savePointSettings: {
                show: true,
                latlng: { lat, lng }
              },
            })
            this.props.navigation.navigate('AddPoint')
          }}
          onRegionChangeComplete={(mapRegion) => {
            this.props.updateReduxState({ tempRegion: mapRegion })
          }}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={this.props.mapRegion || this.getMapRegion()}
          mapPadding={{
            top: mapPadding * 2,
            right: mapPadding,
            bottom: mapPadding,
            left: mapPadding
          }}
          mapType={this.props.mapViewType || 'standard'}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
        >
          <Markers navigation={this.props.navigation} />
        </MapView>

        <Callout style={width > height ? styles.rightTools : { marginTop: 130 }}>
          <DeleteMarkers />
        </Callout>

        <Callout>
          <Navigation />
        </Callout>

        {viewType === 'Current' ? null :
          <Callout style={{ bottom: 0, width }}>
            <Slider />
          </Callout>}

        <Callout style={styles.rightTools}>
          <MapViewType />
        </Callout>

        <Callout style={{ top: 0 }}>
          <Search width={width} height={height} />
        </Callout>

        {!isLogo && <Callout>
          <TouchableOpacity onPress={() => {
            this.setState({ isLogo: true })
            AsyncStorage.setItem('isLogo', 'true')
          }}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/tooltip.png')} style={styles.logo} />
            </View>
          </TouchableOpacity>
        </Callout>}

        {/* <Callout
          style={{
            bottom: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: height / 6,
          }}>
          <View style={{ padding: 0, opacity: 0.7, backgroundColor: "#000", borderRadius: 50 }}>
            <Text style={{ padding: 10, color: 'white', textAlign: 'center' }}>{viewType} mode</Text>
          </View>
        </Callout>*/}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    mapRegion: state.get('mapRegion'),
    mapViewType: state.get('mapViewType'),
    viewType: state.get('viewType'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    scaleWind: state.get('scaleWind'),
    dangers: state.get('dangers'),
  }
}

export default connect(mapStateToProps, actions)(Map)

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
  rightTools: {
    margin: 5,
    marginTop: 70,
    right: 0,
  },
  logoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width,
    height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 219,
    height: 257,
    marginTop: -50,
  },
})
