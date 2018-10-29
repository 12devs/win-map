import { createStore } from "redux";
import React, { Component } from "react";
import reducer from "./../reducers";
import { connect, Provider } from "react-redux";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main/Main";

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

store.subscribe(() => {
  console.log("store", store.getState().toJS());
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="map__navigation-user">
              <Link className="map__navigation-user-link" to="/main">Main</Link>
              <Link className="map__navigation-user-link" to="/register">Register</Link>
              <Link className="map__navigation-user-link" to="/login">Login</Link>
            </div>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/main" component={Main} />
              <Route children={() => <h2>Not found</h2>} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
