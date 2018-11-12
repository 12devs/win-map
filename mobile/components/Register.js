import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import services from '../services/index';
import { Button } from 'react-native-elements';

class Register extends Component {
  state = {
    login: '',
    password: '',
    repeatPassword: '',
    error: ''
  };

  handleLogin = (text) => {
    this.setState({ login: text });
  };

  handlePassword = (text) => {
    this.setState({ password: text });
  };

  handleRepeatPassword = (text) => {
    this.setState({ repeatPassword: text });
  };

  login = () => {
    const { login, password, repeatPassword, error } = this.state;

    if (password === repeatPassword) {
      services.register(login, password)
        .then((e) => {
          console.log('e', e);
          if (e.message !== 'OK') {
            this.setState({ error: `${e.error}${e.message}` });
          }
          else
            return this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          this.setState({ error: error.toString() });
        });
    }
    else {
      this.setState({ error: 'Passwords do not match' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder="Username"
                   placeholderTextColor="#3D6DCC"
                   autoCapitalize="none"
                   onChangeText={this.handleLogin}/>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   secureTextEntry={true}
                   placeholder="Password"
                   placeholderTextColor="#3D6DCC"
                   autoCapitalize="none"
                   onChangeText={this.handlePassword}/>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   secureTextEntry={true}
                   placeholder="Repeat Password"
                   placeholderTextColor="#3D6DCC"
                   autoCapitalize="none"
                   onChangeText={this.handleRepeatPassword}/>
        {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
        <Button
          containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
          backgroundColor={'#3D6DCC'}
          large
          borderRadius={50}
          title='Register'
          color={'#fff'}
          onPress={this.login}/>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#3D6DCC',
    borderWidth: 1,
    borderRadius: 50
  },
});
