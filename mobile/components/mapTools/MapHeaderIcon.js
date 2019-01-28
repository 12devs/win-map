import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import hasItem from '../../utils/asyncStorage'

const { width } = Dimensions.get('window')

class AccountIcon extends Component {

  constructor() {
    super()
    this.state = {
      hasToken: false,
    }
  }

  componentDidMount() {
    return hasItem('windToken').then(res => {
      if (res) {
        return this.setState({ hasToken: true })
      }
      return this.setState({ hasToken: false })
    })
  }

  render() {
    if (this.state.hasToken) {
      return <Icon
        onPress={() => {
          this.props.navigation.navigate('Logout')
        }}
        name='exit-to-app'
        color='#fff'
        size={25}
        containerStyle={{ marginRight: width * 0.04 }}
      />
    }
    return <Icon
      onPress={() => {
        this.props.navigation.navigate('Login')
      }}
      name='lock-outline'
      color='#fff'
      size={25}
      containerStyle={{ marginRight: width * 0.04 }}
    />
  }
}

export default AccountIcon