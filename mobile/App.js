import React from 'react';
import Login from './Login.js'
import Register from './Register.js'
import Main from './Main.js'
import Test from './Test.js'
import Menu from './Menu.js'
import PointSettings from './PointSettings.js'
import { Router, Scene } from 'react-native-router-flux'
import reducer from "./reducers";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import AddPoint from './AddPoint';

const store = createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: {
    stations: [],
    places: [],
    dangers: [],
    stationsData: {},
    markerType: "My Place",
    viewType: "Current",
    actionType: "Add",
    scaleWind: 5000,
    notificationSettings: [],
    savePointSettings: {show: false},
    notifications: [],
    info: {
      point: null,
      type: null
    }
  }
});

// store.subscribe(() => {
//   console.log("store", store.getState().toJS());
// });

const App = () => {
  return (
    <Provider store={store}>
      <Menu/>
    </Provider>
  )
};
export default App
