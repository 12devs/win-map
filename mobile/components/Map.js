import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native'
import { PROVIDER_DEFAULT } from 'react-native-maps'
import MapView, { ProviderPropType, Callout } from 'react-native-maps'
import Markers from './markers/Markers'
import actions from '../actions/index'
import { connect } from "react-redux"
import Navigation from "./mapTools/Navigation"
import Search from './mapTools/Search'
import Slider from './mapTools/Slider'
import MapViewType from './mapTools/MapViewType'
import DeleteMarkers from './mapTools/DelAllMarkers'
import hasItem from "../utils/asyncStorage"
import Permissions from 'react-native-permissions'
import UserLocation from "./mapTools/UserLocation"
import Loader from "./Loader"

const { width, height } = Dimensions.get('window')

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      layout: {
        height: height,
        width: width,
      },
      isLogo: true,
      isLoader: false
    }
  }

  componentDidMount = async () => {
    const isLogo = await hasItem('isLogo')

    this.setState({ isLogo })

    await this.watchPosition()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.position)
  }

  requestLocationPermission = async () => {
    try {
      return await Permissions.request('location')
    } catch (e) {
      console.error(e)
    }
  }

  watchPosition = async () => {
    console.log('watchPosition')

    try {

      const granted = await this.requestLocationPermission()

      if (granted === 'authorized') {

        if (!this.props.userLocation && !this.props.mapRegion) {
          this.setState({ isLoader: true })
        }

        this.position = navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords
            console.log(latitude, longitude)
            this.props.updateReduxState({
              userLocation: {
                latitude,
                longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01,
              }
            })
            this.setState({ isLoader: false })

          },
          ({ code, message }) => {
            console.warn(Object.assign(new Error(message), { name: "PositionError", code }))

            this.setState({ isLoader: false })
          },
          { enableHighAccuracy: false, timeout: 5000 }
        )
      }

    } catch (err) {
      console.warn(err)
      this.setState({ isLoader: false })
      Alert.alert(
        'Alert',
        'Failed to get geolocation!',
        [
          { text: 'Ok', onPress: () => console.log('No Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      )
    }
  }

  getMapRegion = () => {
    const { userLocation, mapRegion } = this.props

    return mapRegion || userLocation
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
    const { viewType, mapViewType, userLocation } = this.props
    const { layout, isLogo, isLoader } = this.state
    const { width, height } = layout
    const mapPadding = 50

    if (isLoader) {
      return <Loader size='large' color='#3D6DCC' />
    }

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <MapView
          ref={component => this._map = component}
          onPress={(e) => {
            const { latitude: lat, longitude: lng } = e.nativeEvent.coordinate
            this.props.updateReduxState({ savePointSettings: { show: true, latlng: { lat, lng } }, })
            this.props.navigation.navigate('AddPoint')
          }}
          onRegionChangeComplete={(mapRegion) => {
            this.props.updateReduxState({ tempRegion: mapRegion })
          }}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={this.getMapRegion()}
          mapPadding={{
            top: mapPadding * 2,
            right: mapPadding,
            bottom: mapPadding,
            left: mapPadding
          }}
          mapType={mapViewType || 'standard'}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
        >
          <Markers navigation={this.props.navigation} />
        </MapView>

        <Callout style={{ marginTop: 130 }}>
          <DeleteMarkers />
        </Callout>

        <Callout style={[styles.rightTools, { marginTop: 0 }]}>
          <UserLocation location={async () => {
            const granted = await this.requestLocationPermission()

            if (granted === 'authorized') {
              if (this.position === undefined) {
                await this.watchPosition()
              }
              this._map.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }, 500)
            }


          }} />
        </Callout>

        <Callout>
          <Navigation />
        </Callout>

        {
          viewType === 'Current'
            ? null
            : <Callout style={{ bottom: 0, width }}>
              <Slider />
            </Callout>
        }

        <Callout style={styles.rightTools}>
          <MapViewType />
        </Callout>

        <Callout style={{ top: 0 }}>
          <Search width={width} height={height} />
        </Callout>

        {
          !isLogo && <Callout>
            <TouchableOpacity onPress={() => {
              this.setState({ isLogo: true })
              AsyncStorage.setItem('isLogo', 'true')
            }}>
              <View style={styles.logoContainer}>
                <Image source={require('../assets/tooltip.png')} style={styles.logo} />
              </View>
            </TouchableOpacity>
          </Callout>
        }

        {/*  <Callout
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
    userLocation: state.get('userLocation'),
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
    flex: 1,
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
