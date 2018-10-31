import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import services from "./services";
import { Actions } from 'react-native-router-flux';
import Navigation from "./Navigation";

class Login extends Component {
  state = {
    login: '',
    password: ''
  };
  handleEmail = (text) => {
    this.setState({ login: text })
  };
  handlePassword = (text) => {
    this.setState({ password: text })
  };
  login = () => {
    const { login, password } = this.state;
    services.login(login, password)
      .then(res => {
        AsyncStorage.setItem('windToken', res.token);
        Actions.Main();

      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <View style = {styles.container}>
        <Navigation/>
        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = " Login"
                   placeholderTextColor = "#9a73ef"
                   autoCapitalize = "none"
                   onChangeText = {this.handleEmail}/>

        <TextInput style = {styles.input}
                   underlineColorAndroid = "transparent"
                   placeholder = " Password"
                   placeholderTextColor = "#9a73ef"
                   autoCapitalize = "none"
                   onChangeText = {this.handlePassword}/>

        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {
            () => this.login(this.state.email, this.state.password)
          }>
          <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default Login

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    // flex:1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  }
});
