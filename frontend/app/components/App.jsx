import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter as Router, Link } from 'react-router-dom';
import Main from './Main/Main';
import City from './City/City';
import Cheker from './Cheker';
import MyMapComponent from './Map';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getUserSettings: () => dispatch(getUserSettings()),
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Cheker}/>
          <Route path="/main" component={Main}/>
          <Route path="/city/:code" component={City}/>
          <Route path="/map" component={()=>{
            return (<MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBm14psj1plbzjQEFAfVvML-nClpO7HERs&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: '100%'}}/>}
                containerElement={<div style={{height: '400px'}}/>}
                mapElement={<div style={{height: '100%'}}/>}
              />
            )
          }}/>
          <Route children={() => <h2>Not found</h2>}/>
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
