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
            console.log('Yes Pressed', this.props.navigation);

            AsyncStorage.setItem('windToken', '');
            this.props.updateReduxState({
              menuRule: 'notLogged',
              isGetMainData: false,
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
            });

            return this.props.navigation.navigate('Map');
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
