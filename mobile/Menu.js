import React, { Component } from 'react';

import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Main from './Main';
import Test from './Test';
import Notifications from './Notifications';
import notificationSettings from './notificationSettings';

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 5, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const Register_StackNavigator = createStackNavigator({
  First: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'Register',
      headerLeft: <HamburgerIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#3D6DCC'
      },
      headerTintColor: '#fff',
    })
  },
});


const Login_StackNavigator = createStackNavigator({
  Second: {
    screen: Login,
    navigationOptions: ({ navigation }) => {
      return ({
        title: 'Login',
        headerLeft: <HamburgerIcon navigationProps={navigation}/>,
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    }
  },
});


const Main_StackNavigator = createStackNavigator({
  Third: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerLeft: <HamburgerIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#3D6DCC'
      },
      headerTintColor: '#fff',
    })
  },
});

const notificationSettings_StackNavigator = createStackNavigator({
  Third: {
    screen: notificationSettings,
    navigationOptions: ({ navigation }) => ({
      title: 'Notification Settings',
      headerLeft: <HamburgerIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#3D6DCC'
      },
      headerTintColor: '#fff',
    })
  },
});

const test_StackNavigator = createStackNavigator({
  Third: {
    screen: Test,
    navigationOptions: ({ navigation }) => ({
      title: 'Test',
      headerLeft: <HamburgerIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#3D6DCC'
      },
      headerTintColor: '#fff',
    })
  },
});

const notifications_StackNavigator = createStackNavigator({
  Third: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => ({
      title: 'Notifications',
      headerLeft: <HamburgerIcon navigationProps={navigation}/>,
      headerStyle: {
        backgroundColor: '#3D6DCC'
      },
      headerTintColor: '#fff',
    })
  },
});

export default MyDrawerNavigator = createDrawerNavigator({
    Register: {
      screen: Register_StackNavigator
    },
    Login: {
      screen: Login_StackNavigator
    },
    Map: {
      screen: Main_StackNavigator
    },
    notificationSettings: {
      screen: notificationSettings_StackNavigator
    },
    test: {
      screen: test_StackNavigator
    },
    notifications: {
      screen: notifications_StackNavigator
    },
    Logout: Logout
  }, {
    initialRouteName: 'Map',
  }
);


