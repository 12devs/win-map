import React, { Component } from 'react'
import Menu from './components/Menu.js'
import reducer from "./reducers"
import { connect, Provider } from "react-redux"
import { createStore } from "redux"
import OneSignal from 'react-native-onesignal'
import { BackHandler } from 'react-native'
import { exitAppPressed } from './utils/backHandler'
import SplashScreen from 'react-native-splash-screen'


const store = createStore(reducer)

const log = function () {
  [].slice.call(arguments, 0).forEach(elem => {
    console.log('-------', elem)
  })
  return store.dispatch({
    type: "log",
    state: [].slice.call(arguments, 0),
  })
}

store.dispatch({
  type: "SET_STATE",
  state: {
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
  }
})

export default class App extends Component {

  constructor(properties) {
    super(properties)
    OneSignal.init("27ccd574-12cd-4bc2-9f7e-988b6b92ad49")
    OneSignal.configure()
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)

  }

  componentDidMount() {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', exitAppPressed)
  }

  componentWillUnmount() {
    log('componentWillUnmount')
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
    BackHandler.removeEventListener('hardwareBackPress', exitAppPressed)
  }

  onReceived(notification) {
    log("Notification received: ", notification)
  }

  onOpened(openResult) {
    log('Message: ', openResult.notification.payload.body)
    log('Data: ', openResult.notification.payload.additionalData)
    log('isActive: ', openResult.notification.isAppInFocus)
    log('openResult: ', openResult)
  }

  onIds(device) {
    log('Device info: ', device)
  }

  render() {
    return (
      <Provider store={store}>
        <Menu/>
      </Provider>
    )
  }
}
