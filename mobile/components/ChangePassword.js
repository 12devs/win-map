import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import services from '../services/index';
import { Button } from 'react-native-elements';

class ChangePassword extends Component {
  state = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
    error: '',
    changePasswordCode:'',
    showCode: false,
  };

  send = () => {
    const { login, password, repeatPassword, changePasswordCode } = this.state;
    if (password === repeatPassword) {
      services.changePassword({ login, password, changePasswordCode })
        .then((res) => {
          console.log(res);
          const { error, message, email } = res;
          if (message === 'code') {
            return this.setState({ email, showCode: true });
          }
          if (message !== 'OK') {
            this.setState({ error });
          } else {
            return this.props.navigation.navigate('Login');
          }
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
    if (this.state.showCode){
      return (
        <View style={styles.container}>
          <TextInput style={styles.input}
                     value={this.state.code}
                     underlineColorAndroid="transparent"
                     placeholder={"code from " + this.state.email}
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     onChangeText={(changePasswordCode)=>this.setState({changePasswordCode})}/>
          {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
          <Button
            containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
            backgroundColor={'#3D6DCC'}
            large
            borderRadius={50}
            title='SEND'
            color={'#fff'}
            onPress={this.send}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     placeholder="Username"
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     value={this.state.login}
                     onChangeText={(login)=>this.setState({login})}/>
          <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     secureTextEntry={true}
                     placeholder="Password"
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     value={this.state.password}
                     onChangeText={(password)=>this.setState({password})}/>
          <TextInput style={styles.input}
                     underlineColorAndroid="transparent"
                     secureTextEntry={true}
                     placeholder="Repeat Password"
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     value={this.state.repeatPassword}
                     onChangeText={(repeatPassword)=>this.setState({repeatPassword})}/>
          {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
          <Button
            containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
            backgroundColor={'#3D6DCC'}
            large
            borderRadius={50}
            title='Register'
            color={'#fff'}
            onPress={this.send}/>
        </View>
      );
    }
  }
}

export default ChangePassword;

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
