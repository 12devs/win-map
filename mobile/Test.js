import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import services from './services'
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

class Test extends Component {
  state = {};
  componentDidMount = () => {
    console.log('Test, componentDidMount');
    services.getInfo()
      .then(res => {
        this.setState(res)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state}</Text>
      </View>
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
