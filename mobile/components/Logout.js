import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

class Logout extends Component {

  componentDidMount = () => {
    AsyncStorage.setItem('windToken', '');
    return this.props.navigation.navigate('Login')
  };

  render() {
    return null
  }
}

export default Logout

