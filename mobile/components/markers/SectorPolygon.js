import React from 'react'
import _ from 'lodash'
import { Polygon } from 'react-native-maps'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import { getPolygon, getArrMinMaxCount } from '../../utils/utils'

class SectorPolygon extends React.Component {

  render() {
    const { point, simple } = this.props
    const stationsData = this.props.stationsData
    let dist
    if (this.props.dist || this.props.dist === 0) {
      dist = this.props.dist
    } else {
      dist = this.props.scaleWind
    }
    const direction = this.props.direction || _.get(stationsData, [point.station_id, 'current', 'dir'], null)
    if (direction) {
      try {
        if (simple) {
          const positions = getPolygon(point, dist, direction, 11.25)
          return <Polygon
            // lineCap={'round'}
            key={`polygon ${point.type} ${point.id}`}
            coordinates={positions}
            strokeWidth={1}
            strokeColor={'rgba(95, 87, 202, 0.7)'}
            fillColor={'rgba(95, 87, 202, 0.5)'}
          />
        }
        const angles = getArrMinMaxCount(0, 12.5, 10)
        const dists = getArrMinMaxCount(0, point.dangerRadius, 10)
        return angles.map((angle, i) => {
          const positions = getPolygon(point, dists[i], direction, angle)
          return <Polygon
            // lineCap={'round'}
            key={`polygon ${point.type} ${point.id} ${i}`}
            coordinates={positions}
            strokeWidth={1}
            strokeColor={'rgba(95, 87, 202, 0)'}
            fillColor={'rgba(95, 87, 202, 0.18)'}
          />
        })
      } catch (err) {
        return null
      }
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    scaleWind: state.get('scaleWind'),
  }
}

export default connect(mapStateToProps, actions)(SectorPolygon)
