import React from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import UserPlace from './UserPlace'
import Danger from './Danger'

class Markers extends React.Component {

  render() {
    const { places, dangers, navigation } = this.props
    const UserPlaces = places.map((point, id) => {
      return <UserPlace key={id} point={point} showInfo={this.showInfo} navigation={navigation}/>
    })
    const Dangers = dangers.map((point) => {
      return <Danger key={`Danger ${point.type} ${point.id}`} point={point} showInfo={this.showInfo}
                     navigation={navigation}/>
    })
    return [].concat(UserPlaces, Dangers)
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
