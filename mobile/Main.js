import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import Navigation from "./Navigation";


const screen = Dimensions.get('window');

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = (email, pass) => {
    /*fetch('http://192.168.1.87:8081/publicRouts/test', {
      method: "get",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });*/
    console.log(this.state);
  };

  render() {
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE = 37.78825;
    const LONGITUDE = -122.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    return (
      <View style={styles.container}>
        <Navigation/>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
        </MapView>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  map: {
    flex: 10,
  }
});
