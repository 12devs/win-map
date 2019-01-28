import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import { connect } from "react-redux"
import actions from "../actions"
import OneSignal from "react-native-onesignal"
import services from "../services/index"

class Logout extends Component {

  constructor() {
    super()
    this.state = {
      device: {}
    }
    this.onIds = this.onIds.bind(this)
  }

  componentDidMount = () => {
    Alert.alert(
      'Alert',
      'Do you want to logout?',
      [
        {
          text: 'No', onPress: () => {
            return this.props.navigation.goBack()
          }, style: 'cancel'
        },
        {
          text: 'Yes', onPress: () => {
            return services.deleteNotificationToken(this.state.device.userId).then(res => {
              AsyncStorage.setItem('windToken', '')
              this.props.updateReduxState({
                menuRule: 'notLogged',
                isGetMainData: false,
                stations: [],
                places: [],
                dangers: [],
                stationsData: {},
                markerType: "My Place",
                viewType: "Current",
                mapViewType: "standard",
                actionType: "Add",
                scaleWind: 5000,
                notificationSettings: [],
                savePointSettings: { show: false },
                notifications: [],
                info: {
                  point: null,
                  type: null
                },
                addPoint: { name: '', error: '', isSentButton: false },
                isConnected: true
              })

              return this.props.navigation.navigate('Map')
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  componentWillMount() {
    OneSignal.configure()
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onIds(device) {
    console.log('Device info: ', device)
    this.setState({ device })
  }

  render() {
    return null
  }
}

export default connect(null, actions)(Logout)
