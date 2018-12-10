import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import services from '../services/index';
import { Button, Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class Register extends Component {
  state = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
    error: ''
  };

  register = () => {
    const { login, password, repeatPassword, email } = this.state;

    if (password === repeatPassword) {
      services.register({ login, password, email })
        .then(res => {
          const { message, error } = res;
          if (message !== 'OK') {
            error ? this.setState({ error }) : this.setState({ error: message });
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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="email"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       value={this.state.email}
                       onChangeText={(email) => this.setState({ email })}/>
            <View style={styles.iconContainer}>
              <Icon name='mail-outline' color='#3D6DCC'/>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       placeholder="Username"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       value={this.state.login}
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
                       underlineColorAndroid="transparent"
                       secureTextEntry={true}
                       placeholder="Password"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       value={this.state.password}
                       onChangeText={(password) => this.setState({ password })}/>
            <View style={styles.iconContainer}>
              <Icon name='lock-outline' color='#3D6DCC'/>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <TextInput style={styles.input}
                       underlineColorAndroid="transparent"
                       secureTextEntry={true}
                       placeholder="Repeat Password"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       value={this.state.repeatPassword}
                       onChangeText={(repeatPassword) => this.setState({ repeatPassword })}/>
            <View style={styles.iconContainer}>
              <Icon name='lock-outline' color='#3D6DCC'/>
            </View>
          </View>
          {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {this.state.error}</Text> : null}
          <Button
            containerViewStyle={styles.buttonContainer}
            backgroundColor={'#3D6DCC'}
            // large
            // borderRadius={50}
            title='Register'
            color={'#fff'}
            onPress={this.register}/>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Text style={styles.textContainer}>Do have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text style={styles.secondaryTextContainer}>You can login here.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    // marginTop: 10,
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
    width: width / 1.3,
    justifyContent: 'center',
    alignItems: 'center',
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
    // width: width / 1.3,
    //
    marginLeft: width * 0.06,
    marginRight: width * 0.06,
    borderWidth: 1,
    borderColor: '#3D6DCC'
  }
});
