import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import services from "../services/index";
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import actions from "../actions";

class Login extends Component {
  state = {
    login: '',
    password: '',
    code: '',
    email: '',
    error: '',
    showCode: false,
  };

  login = () => {
    const { login, password, code } = this.state;
    return services.login({ login, password, code })
      .then(res => {
        console.log(res);
        const { message, email, error, token } = res;
        this.setState({ code: '' });
        if (message === 'code') {
          return this.setState({ showCode: true, email });
        }
        if (message !== 'OK') {
          this.setState({ error });
        } else {
          return AsyncStorage.setItem('windToken', token)
            .then(()=>{
              this.props.updateReduxState({menuRule: 'logged'});
              return this.props.navigation.navigate('Map');
            })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    if (this.state.showCode) {
      return (
        <View style={styles.container}>
          <TextInput style={styles.input}
                     value={this.state.code}
                     underlineColorAndroid="transparent"
                     placeholder={"code from " + this.state.email}
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     onChangeText={(code) => this.setState({ code })}/>
          {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
          <Button
            containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
            backgroundColor={'#3D6DCC'}
            large
            borderRadius={50}
            title='SEND'
            color={'#fff'}
            onPress={this.login}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <TextInput style={styles.input}
                     value={this.state.login}
                     underlineColorAndroid="transparent"
                     placeholder="username"
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     onChangeText={(login) => this.setState({ login })}/>

          <TextInput style={styles.input}
                     value={this.state.password}
                     secureTextEntry={true}
                     underlineColorAndroid="transparent"
                     placeholder="password"
                     placeholderTextColor="#3D6DCC"
                     autoCapitalize="none"
                     onChangeText={(password) => this.setState({ password })}/>
          {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
          <Button
            containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
            backgroundColor={'#3D6DCC'}
            large
            borderRadius={50}
            title='LOGIN'
            color={'#fff'}
            onPress={this.login}/>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Login);

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
