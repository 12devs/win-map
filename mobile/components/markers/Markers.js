import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import UserPlace from './UserPlace'
import Danger from './Danger'
import SectorPolygon from "./SectorPolygon"
import WindRose from "./WindRose"

const components = {
  Current: SectorPolygon,
  Historical: WindRose,
}

class Markers extends React.Component {

  render() {
    const { places, dangers, navigation } = this.props
    const Component = components[this.props.viewType]

    const UserPlaces = places.map((point, id) => {
      return <UserPlace key={`PLace ${point.id} ${id}`} point={point} showInfo={this.showInfo} navigation={navigation}/>
    })

    const Dangers = dangers.map((point, id) => {
      return <Danger key={`Danger ${point.id}  ${id}`} point={point} showInfo={this.showInfo}
                     navigation={navigation}/>
    })

    const Polygons = dangers.map((point, id) => {
      return  <Component key={`SectorPolygons${id}`} point={point}/>
    })

    return [].concat(UserPlaces, Dangers, Polygons)
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    viewType: state.get('viewType'),
  }
}

export default connect(mapStateToProps, actions)(Markers)
