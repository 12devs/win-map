import React from 'react';
import Menu from './Menu.js'
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
    mapViewType: "standard",
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
