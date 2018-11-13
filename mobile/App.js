import Menu from './Menu.js'
import reducer from "./reducers";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const store = createStore(reducer);

const log = (data) => {
  console.log('-------', data);
  return store.dispatch({
    type: "log",
    state: data
  });
};

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
    }
  }
});

export default class App extends Component {

  constructor(properties) {
    log('App constructor');
    log('App 2');
    log('App 3');
    super(properties);
    // OneSignal.init("27ccd574-12cd-4bc2-9f7e-988b6b92ad49");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

  }

  // componentDidMount(){
  //   setTimeout(()=>{
  //     log('time');
  //     OneSignal.addEventListener('received', this.onReceived);
  //     OneSignal.addEventListener('opened', this.onOpened);
  //     OneSignal.addEventListener('ids', this.onIds);
  //   },5000);
  // }

  componentWillUnmount() {
    log('componentWillUnmount');
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    log("Notification received: ", notification);
  }

  onOpened(openResult) {
    log('Message: ', openResult.notification.payload.body);
    log('Data: ', openResult.notification.payload.additionalData);
    log('isActive: ', openResult.notification.isAppInFocus);
    log('openResult: ', openResult);
  }

  onIds(device) {
    log('Device info: ');
    log(device);
  }

  render() {
    return (
      <Provider store={store}>
        <Menu/>
      </Provider>
    )
  }
}
