import { createStore } from 'redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import reducer from "./../reducers";
import { connect, Provider } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Test from './Test';
import LeafletMap from './LeafletMap'


const store = createStore(reducer);
store.dispatch({
  type: "SET_STATE",
  state: {
    stations: [],
    points: [],
    stationsData: {}
  }
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
            <ul>
              <li>
                <Link to="/register">register</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/test">test</Link>
              </li>
              <li>
                <Link to="/leaflet">leaflet</Link>
              </li>
            </ul>
            <br/>
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/test" component={Test}/>
              <Route path="/leaflet" component={LeafletMap}/>
              <Route children={() => <h2>Not found</h2>}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
