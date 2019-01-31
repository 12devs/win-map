import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, AsyncStorage } from 'react-native'
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

const { width, height } = Dimensions.get('window')

class Map extends Component {

  constructor() {
    super()
    this.state = {
      layout: {
        height: height,
        width: width,
      },
      isLogo: true,
    }
  }

  componentDidMount() {
    hasItem('isLogo').then(isLogo=>{
      return this.setState({isLogo})
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
    const ASPECT_RATIO = 10
    const mapPadding = 50
    const LATITUDE = 53.78825
    const LONGITUDE = 24.4324
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    const initialRegion = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    const { viewType } = this.props
    const { layout, isLogo} = this.state
    const { width, height } = layout

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
        <Callout style={width > height ? styles.rightTools : { marginTop: 130 }}>
          <DeleteMarkers/>
        </Callout>
        <Callout>
          <Navigation/>
        </Callout>
        {viewType === 'Current' ? null :
          <Callout style={{ bottom: 0, width }}>
            <Slider/>
          </Callout>}
        <Callout style={styles.rightTools}>
          <MapViewType/>
        </Callout>
        <Callout style={{ top: 0 }}>
          <Search width={width} height={height}/>
        </Callout>

        {!isLogo && <Callout>
          <TouchableOpacity onPress={() => {
            this.setState({ isLogo: true })
            AsyncStorage.setItem('isLogo', 'true')
          }}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/tooltip.png')} style={styles.logo}/>
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
