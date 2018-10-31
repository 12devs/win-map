import React from 'react';
import Login from './Login.js'
import Register from './Register.js'
import Main from './Main.js'
import Test from './Test.js'
import { Router, Scene } from 'react-native-router-flux'
import reducer from "./reducers";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

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
    savePointSettings: {},
    notifications: [],
    info: {
      place: null,
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
      <Router>
        <Scene key="root">
          <Scene key="Login" component={Login} title="Login"/>
          <Scene key="Register" component={Register} title="Register"/>
          <Scene key="Main" component={Main} title="Main"/>
          <Scene key="Test" component={Test} title="Test" initial={true}/>
        </Scene>
      </Router>
    </Provider>
  )
};
export default App
