import React from 'react'
import services from '../../services/index'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import redIcon from '../../assets/red_marker.png'
import { Marker, ProviderPropType } from 'react-native-maps'
import hasItem from "../../utils/asyncStorage"

class Danger extends React.Component {
  constructor(props) {
    super(props)
    this.updatePosition = this.updatePosition.bind(this)
  }

  updatePosition = async (point, e) => {
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

    if (hasToken) {
      return services.movePoint({
        danger: { lat: latitude, lng: lngCorrect, id: point.id },
        stations: [...this.props.stations]
      })
        .then(res => {
          const dangers = this.props.dangers.filter(el => !(el.id === point.id))
          dangers.push(res.danger)
          let stationsData = this.props.stationsData
          const stations = this.props.stations
          stationsData = { ...stationsData, ...(res.stationsData || {}) }
          stations.push(...Object.keys((res.stationsData || {})))
          return this.props.updateReduxState({ dangers, stations, stationsData })
        })
    }
    return services.movePointUnathorization({
      danger: { lat: latitude, lng: lngCorrect, id: point.id, name: point.name, dangerRadius: point.dangerRadius },
      stations: [...this.props.stations]
    })
      .then(res => {
        const dangers = this.props.dangers.filter(el => !(el.id === point.id))
        let { stationsData, stations } = this.props

        res.danger.dangerRadius = point.dangerRadius
        dangers.push(res.danger)
        stationsData = { ...stationsData, ...(res.stationsData || {}) }
        stations.push(...Object.keys((res.stationsData || {})))
        return this.props.updateReduxState({ dangers, stations, stationsData })
      })
  }

  render() {
    const { point } = this.props
    return <Marker
      key={`marker ${point.type} ${point.id}`}
      coordinate={{
        latitude: point.lat,
        longitude: point.lng
      }}
      onDragEnd={(e) => this.updatePosition(point, e)}
      onPress={(e) => {
        e.stopPropagation()
        this.props.updateReduxState({ info: { point, type: 'danger' } })
        this.props.navigation.navigate('PointSettings')
      }}
      draggable
      // anchor={{ x: 2, y: 2 }}
      centerOffset={{ x: 0, y: -20 }}
      image={redIcon}/>
  }
}

function mapStateToProps(state) {
  return {
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    viewType: state.get('viewType'),
  }
}

export default connect(mapStateToProps, actions)(Danger)
