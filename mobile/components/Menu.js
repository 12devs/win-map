import React, { Component } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Main from './Main';
import Test from './Test';
import Notifications from './Notifications';
import notificationSettings from './notificationSettings';
import Details from './Details';
import NavigateMenu from './NavigateMenu';

const { width, height } = Dimensions.get('window');

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ padding: 5, marginLeft: width * 0.02 }} onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, tintColor: '#fff' }}
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
          backgroundColor: '#3D6DCC',
          textAlign: 'center'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    headerLayoutPreset: 'center'
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
        });
      }
    },
  },
  {
    headerLayoutPreset: 'center'
  });

const Main_StackNavigator = createStackNavigator({
    Third: {
      screen: Main,
      navigationOptions: ({ navigation }) => ({
        title: 'Map',
        headerLeft: <HamburgerIcon navigationProps={navigation}/>,
        headerTitleStyle: { textAlign: 'center' },
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    headerLayoutPreset: 'center',
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
  },
  {
    headerLayoutPreset: 'center'
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
  },
  {
    headerLayoutPreset: 'center'
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
  },
  {
    headerLayoutPreset: 'center'
  });
const addedMarker_StackNavigator = createStackNavigator({
    Details: {
      screen: Details,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Point',
        headerLeft: <HamburgerIcon navigationProps={navigation}/>,
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    mode: 'modal',
    headerLayoutPreset: 'center'
  });

export default createDrawerNavigator({
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
    Details: {
      screen: addedMarker_StackNavigator,
    },
    notifications: {
      screen: notifications_StackNavigator
    },
    Logout: Logout
  }, {
    initialRouteName: 'Map',
    contentComponent: NavigateMenu
  }
);


