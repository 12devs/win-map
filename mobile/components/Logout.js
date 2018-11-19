import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from "react-redux";
import actions from "../actions";

class Logout extends Component {

  componentDidMount = () => {
    AsyncStorage.setItem('windToken', '');
    this.props.updateReduxState({menuRule: 'notLogged'});
    return this.props.navigation.navigate('Login');
  };

  render() {
    return null
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Logout);
