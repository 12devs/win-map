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

  updatePosition = async (id, dangerRadius, e) => {
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
      danger: { lat: latitude, lng: lngCorrect, id, },
      stations: [...this.props.stations]
    }

    if (hasToken) {
      return services.movePoint(query)
        .then(res => {
          const dangers = this.props.dangers.filter(el => !(el.id === id))
          dangers.push(res.danger)
          let stationsData = this.props.stationsData
          const stations = this.props.stations
          stationsData = { ...stationsData, ...(res.stationsData || {}) }
          stations.push(...Object.keys((res.stationsData || {})))
          return this.props.updateReduxState({ dangers, stations, stationsData })
        })
    }
    return services.movePointUnathorization(query)
      .then(res => {
        console.log('res', res)
        const dangers = this.props.dangers.filter(el => !(el.id === id))
        let { stationsData, stations } = this.props

        res.danger.dangerRadius = dangerRadius
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
      onDragEnd={(e) => this.updatePosition(point.id, point.dangerRadius, e)}
      onPress={(e) => {
        e.stopPropagation()
        this.props.updateReduxState({ info: { point, type: 'danger' } })
        this.props.navigation.navigate('PointSettings')
      }}
      draggable
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
