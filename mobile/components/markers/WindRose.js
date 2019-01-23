import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/index'
import SectorPolygon from './SectorPolygon'
import _ from 'lodash'

class WindRose extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { point, scaleWind, stationsData } = this.props
    const dist = scaleWind
    const history = _.get(stationsData, [point.station_id, 'history'], {})
    const directions = Object.keys(history)
    const max = Math.max(..._.values(history))
    const k = dist / max
    return directions.map((direction, i) => {
      return (<SectorPolygon key={i}
                             simple={true}
                             point={point}
                             dist={history[direction] * k}
                             direction={direction}/>)
    })
  }
}

function mapStateToProps(state) {
  return {
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    scaleWind: state.get('scaleWind'),
  }
}

export default connect(mapStateToProps, actions)(WindRose)
