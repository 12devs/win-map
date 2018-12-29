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
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import notificationSettings from './notificationSettings';
import NavigateMenu from './NavigateMenu';
import AddPoint from './AddPoint';
import PointSettings from './PointSettings';
import Back from './mapTools/Back';
import SentPoint from './SentPoint';
import { Icon } from 'react-native-elements';
import SaveNotificationSettings from './SaveNotificationSettings';

const { width, height } = Dimensions.get('window');

class HamburgerIcon extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ padding: 5, marginLeft: width * 0.04 }} onPress={this.toggleDrawer.bind(this)}>
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
        // headerLeft: <HamburgerIcon navigationProps={navigation}/>,
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
          // headerLeft: <HamburgerIcon navigationProps={navigation}/>,
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
        headerRight: <SaveNotificationSettings navigation={navigation}/>,
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    headerLayoutPreset: 'center',
    cardStyle: { backgroundColor: '#fff' }
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
    headerLayoutPreset: 'center',
    cardStyle: { backgroundColor: '#fff' }

  });
const addedMarker_StackNavigator = createStackNavigator({
    Details: {
      screen: AddPoint,
      navigationOptions: ({ navigation }) => ({
        title: 'Add Point',
        headerLeft: <Back navigation={navigation}/>,
        headerRight: <SentPoint navigation={navigation}/>,
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

const pointSettings_StackNavigator = createStackNavigator({
    Details: {
      screen: PointSettings,
      navigationOptions: ({ navigation }) => ({
        title: 'Point Info',
        headerLeft: <Back navigation={navigation}/>,
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    mode: 'modal',
    headerLayoutPreset: 'center',
    // cardStyle: { backgroundColor: '#fff' }

  });
const ChangePassword_StackNavigator = createStackNavigator({
    Details: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        title: 'Change Password',
        // headerLeft: <Back navigation={navigation}/>,
        headerStyle: {
          backgroundColor: '#3D6DCC'
        },
        headerTintColor: '#fff',
      })
    },
  },
  {
    mode: 'modal',
    headerLayoutPreset: 'center',

  });

export default createDrawerNavigator({
    Register: {
      screen: Register_StackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name='add'/>
      }
    },
    Login: {
      screen: Login_StackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name='account-circle'/>
      }
    },
    Map: {
      screen: Main_StackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name='map'/>
      }

    },
    notificationSettings: {
      screen: notificationSettings_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Notification Settings',
        drawerIcon: <Icon name='settings'/>
      }
    },
    AddPoint: {
      screen: addedMarker_StackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
    PointSettings: {
      screen: pointSettings_StackNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
    notifications: {
      screen: notifications_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Notifications',
        drawerIcon: <Icon name='notifications'/>

      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerIcon: <Icon name='exit-to-app'/>

      }
    },
    ChangePassword: {
      screen: ChangePassword_StackNavigator,
      navigationOptions: {
        drawerIcon: <Icon name='exit-to-app'/>

      }
    },
    test: {
      screen: test_StackNavigator
    },
  },
  {
    initialRouteName: 'Map',
    contentComponent: NavigateMenu,
  }
);


