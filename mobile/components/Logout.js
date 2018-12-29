import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { connect } from "react-redux";
import actions from "../actions";

class Logout extends Component {

  componentDidMount = () => {
    console.log('componentDidMount');
    Alert.alert(
      'Alert',
      'Do you really want to logout?',
      [
        {
          text: 'No', onPress: () => {
            console.log('No Pressed');
            return this.props.navigation.goBack();
          }, style: 'cancel'
        },
        {
          text: 'Yes', onPress: () => {
            console.log('Yes Pressed');
            AsyncStorage.setItem('windToken', '');
            this.props.updateReduxState({ menuRule: 'notLogged', isGetMainData: false });
            return this.props.navigation.navigate('Login');
          }
        },
      ],
      { cancelable: false }
    );

  };

  render() {

    return null;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Logout);
