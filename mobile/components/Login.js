import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import services from "../services/index";
import { Button, Icon } from 'react-native-elements';
import { connect } from "react-redux";
import actions from "../actions";

const { width, height } = Dimensions.get('window');

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
        this.setState({ error: '' });
        if (message === 'code') {
          return this.setState({ showCode: true, email });
        }
        if (message !== 'OK') {
          error ? this.setState({ error }) : this.setState({ error: message });
        } else {
          return AsyncStorage.setItem('windToken', token)
            .then(() => {
              this.props.updateReduxState({ menuRule: 'logged' });
              return this.props.navigation.navigate('Map');
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    if (this.state.showCode) {
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <TextInput style={styles.input}
                           value={this.state.code}
                           underlineColorAndroid="transparent"
                           placeholder={"code from " + this.state.email}
                           placeholderTextColor="#3D6DCC"
                           autoCapitalize="none"
                           onChangeText={(code) => this.setState({ code })}/>
                <View style={styles.iconContainer}>
                  <Icon name='lock-outline' color='#3D6DCC'/>
                </View>
              </View>
              {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  // borderRadius={50}
                  title='SEND'
                  color={'#fff'}
                  onPress={this.login}/>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <TextInput style={styles.input}
                           value={this.state.login}
                           underlineColorAndroid="transparent"
                           placeholder="Username"
                           placeholderTextColor="#3D6DCC"
                           autoCapitalize="none"
                           onChangeText={(login) => this.setState({ login })}/>
                <View style={styles.iconContainer}>
                  <Icon name='perm-identity' color='#3D6DCC'/>
                </View>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <TextInput style={styles.input}
                           value={this.state.password}
                           secureTextEntry={true}
                           underlineColorAndroid="transparent"
                           placeholder="Password"
                           placeholderTextColor="#3D6DCC"
                           autoCapitalize="none"
                           onChangeText={(password) => this.setState({ password })}/>
                <View style={styles.iconContainer}>
                  <Icon name='lock-outline' color='#3D6DCC'/>
                </View>
              </View>
              {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  // borderRadius={50}
                  title='LOGIN'
                  color={'#fff'}
                  onPress={this.login}/>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Text style={styles.textContainer}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Register');
                }}>
                <Text style={styles.secondaryTextContainer}>You can register here.</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Text style={styles.textContainer}>Forgot your password?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ChangePassword');
                }}>
                <Text style={styles.secondaryTextContainer}>You can reset it here.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Login);

const styles = StyleSheet.create({
  mainContainer: {
    // margin: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 2,
    backgroundColor: '#fff',

  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
    // margin: 10,
    // elevation: 5
  },
  iconContainer: {
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    // marginTop: 10,
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "80%",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  textContainer: {
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#525966',
    padding: 10,
  },
  secondaryTextContainer: {
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#3D6DCC',
    padding: 10,
  },
  buttonContainer: {
    marginTop: 35,
    marginBottom: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: '#3D6DCC'
  }
});
