import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import services from '../services/index'
import { Actions } from 'react-native-router-flux';

class Register extends Component {
  state = {
    login: 'x',
    password: 'x'
  };
  handleLogin = (text) => {
    this.setState({ login: text })
  };
  handlePassword = (text) => {
    this.setState({ password: text })
  };
  login = () => {
    const { login, password } = this.state;
    services.register(login, password)
      .then(() => {
        Actions.Login()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder="Login"
                   placeholderTextColor="#9a73ef"
                   autoCapitalize="none"
                   onChangeText={this.handleLogin}/>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder="Password"
                   placeholderTextColor="#9a73ef"
                   autoCapitalize="none"
                   onChangeText={this.handlePassword}/>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.login}>
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register

const styles = StyleSheet.create({
  container: {
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
});
