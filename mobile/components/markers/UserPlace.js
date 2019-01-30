import React from 'react'
import services from '../../services/index'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import blueIcon from '../../assets/blue_marker.png'
import { Marker, ProviderPropType } from 'react-native-maps'
import hasItem from "../../utils/asyncStorage"

class UserPlace extends React.Component {
  constructor(props) {
    super(props)
    this.updatePosition = this.updatePosition.bind(this)
  }

  async updatePosition(id, e) {
    let { latitude, longitude } = e.nativeEvent.coordinate
    let lngCorrect = longitude
    const hasToken = await hasItem('windToken')

    lngCorrect = lngCorrect % 360
    if (lngCorrect > 180) {
      lngCorrect -= 360
    }
    if (lngCorrect < -180) {
      lngCorrect += 360
    }

    const query = {
      place: { lat: latitude, lng: lngCorrect, id },
      stations: [...this.props.stations]
    }

    if (hasToken) {
      return services.movePoint(query)
        .then(res => this.helperUpdatePosition(res, id))
    }
    return services.movePointUnathorization(query)
      .then(res => this.helperUpdatePosition(res, id))
  };

  helperUpdatePosition(res, id) {
    const places = this.props.places.filter(el => !(el.id === id))
    let { stationsData, stations } = this.props

    places.push(res.place)
    stationsData = { ...stationsData, ...res.stationsData }
    stations.push(...Object.keys((res.stationsData || {})))
    return this.props.updateReduxState({ places, stationsData, stations })
  }

  render() {
    return (
      <Marker
        coordinate={{
          latitude: this.props.point.lat,
          longitude: this.props.point.lng
        }}
        onDragEnd={(e) => {
          this.updatePosition(this.props.point.id, e)
          this.props.updateStatistic()
        }}
        onPress={(e) => {
          e.stopPropagation()
          this.props.updateReduxState({ info: { point: this.props.point, type: 'place' } })
          this.props.navigation.navigate('PointSettings')
        }}
        draggable
        image={blueIcon}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  }
}

export default connect(mapStateToProps, actions)(UserPlace)
