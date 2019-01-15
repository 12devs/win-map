import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import services from '../services/index'
import { Button, Icon } from 'react-native-elements'
import connect from 'react-redux/es/connect/connect'
import actions from '../actions'

class Register extends Component {
  state = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
    error: '',
    showPassword: false,
    showRepeatPassword: false
  }

  register = () => {
    const { login, password, repeatPassword, email } = this.state
    const { places, dangers } = this.props

    if (password === repeatPassword) {
      services.register({ login, password, email, places, dangers })
        .then(res => {
          const { message, error } = res
          if (message !== 'OK') {
            error ? this.setState({ error }) : this.setState({ error: message })
          }
          else
            return this.props.navigation.navigate('Login')
        })
        .catch((error) => {
          this.setState({ error: error.toString() })
        })
    }
    else {
      this.setState({ error: 'Passwords do not match' })
    }
  }

  render() {
    const { showPassword, email, login, error, showRepeatPassword } = this.state
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={styles.iconContainer}>
                <Icon name='mail-outline' color='#3D6DCC'/>
              </View>
              <TextInput style={styles.input}
                         underlineColorAndroid="transparent"
                         placeholder="email"
                         placeholderTextColor="#3D6DCC"
                         autoCapitalize="none"
                         value={email}
                         onChangeText={(email) => this.setState({ email })}/>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={styles.iconContainer}>
                <Icon name='perm-identity' color='#3D6DCC'/>
              </View>
              <TextInput style={styles.input}
                         underlineColorAndroid="transparent"
                         placeholder="Username"
                         placeholderTextColor="#3D6DCC"
                         autoCapitalize="none"
                         value={login}
                         onChangeText={(login) => this.setState({ login })}/>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={styles.iconContainer}>
                <Icon name='lock-outline' color='#3D6DCC'/>
              </View>
              <TextInput style={styles.inputPassword}
                         underlineColorAndroid="transparent"
                         secureTextEntry={!showPassword}
                         placeholder="Password"
                         placeholderTextColor="#3D6DCC"
                         autoCapitalize="none"
                         value={this.state.password}
                         onChangeText={(password) => this.setState({ password })}/>
              <View style={styles.iconContainerPassword}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                  <Icon onPress={() => {
                    this.setState({ showPassword: !showPassword })
                  }} name={showPassword ? 'eye-off' : 'eye'} type='material-community' color='gray'/>
                </View>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <View style={styles.iconContainer}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                  <Icon name='lock-outline' color='#3D6DCC'/>
                </View>
              </View>
              <TextInput style={styles.inputPassword}
                         underlineColorAndroid="transparent"
                         secureTextEntry={!showRepeatPassword}
                         placeholder="Repeat Password"
                         placeholderTextColor="#3D6DCC"
                         autoCapitalize="none"
                         value={this.state.repeatPassword}
                         onChangeText={(repeatPassword) => this.setState({ repeatPassword })}/>
              <View style={styles.iconContainerPassword}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                  <Icon onPress={() => {
                    this.setState({ showRepeatPassword: !showRepeatPassword })
                  }} name={showRepeatPassword ? 'eye-off' : 'eye'} type='material-community' color='gray'/>
                </View>
              </View>
            </View>
            {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {error}</Text> : null}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <Button
                containerViewStyle={styles.buttonContainer}
                backgroundColor={'#3D6DCC'}
                // large
                // borderRadius={50}
                title='Register'
                color={'#fff'}
                onPress={this.register}/>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text style={styles.textContainer}>Do have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}>
              <Text style={styles.secondaryTextContainer}>You can login here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
  }
}

export default connect(mapStateToProps, actions)(Register)

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 2,
    backgroundColor: '#fff',

  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
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
  iconContainerPassword: {
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: '15%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPassword: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "65%",
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
})
