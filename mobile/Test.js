import React, { Component } from 'react'
import Navigation from './Navigation'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import services from './services'
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

class Test extends Component {
  state = {
    token:'',
    info: {}
  };
  componentDidMount = () => {
    return AsyncStorage.getItem('windToken')
      .then(windToken => {
        this.setState({token: windToken});
        return services.getInfo()
          .then(res => {
            this.setState({info:res})
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Navigation/>
        <Text>{JSON.stringify(this.state, null, 4)}</Text>
      </ScrollView>
    )
  }
}

export default Test

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
});
