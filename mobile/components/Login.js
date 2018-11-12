import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import services from "../services/index";
import { Button } from 'react-native-elements';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: ''
  };
  handleEmail = (text) => {
    this.setState({ login: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = () => {
    const { login, password } = this.state;
    return services.login(login, password)
      .then(res => {
        console.log(res);
        if (res.error) {
          this.setState({ error: res.error });
        }
        else {
          AsyncStorage.setItem('windToken', res.token);
          return this.props.navigation.navigate('Map');
        }

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
                   placeholder="username"
                   placeholderTextColor="#3D6DCC"
                   autoCapitalize="none"
                   onChangeText={this.handleEmail}/>

        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder="password"
                   placeholderTextColor="#3D6DCC"
                   autoCapitalize="none"
                   onChangeText={this.handlePassword}/>
        {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
        <Button
          containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
          backgroundColor={'#3D6DCC'}
          large
          borderRadius={50}
          title='LOGIN'
          color={'#fff'}
          onPress={
            () => this.login(this.state.email, this.state.password)
          }/>
      </View>
    );
  }
}

export default Login;

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
