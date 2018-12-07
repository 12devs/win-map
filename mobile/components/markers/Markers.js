import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import UserPlace from './UserPlace';
import { View } from 'react-native';
import Danger from './Danger';

class Markers extends React.Component {

  render() {
    const {places, dangers, navigation, viewType} = this.props;
    return (
      <View>
        {places.map((point, id) => {
          return <UserPlace key={id} point={point} showInfo={this.showInfo} navigation={navigation}/>;
        })}
        {dangers.map((point, id) => {
          return <Danger key={new Date() + id} point={point} showInfo={this.showInfo} navigation={navigation}/>;
        })}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    viewType: state.get('viewType'),
  };
}

export default connect(mapStateToProps, actions)(Markers);
