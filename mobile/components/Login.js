import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from 'react-native'
import services from "../services/index"
import { Button } from 'react-native-elements'
import { connect } from "react-redux"
import actions from "../actions"
import OneSignal from 'react-native-onesignal'
import AuthorizationInput from "./AuthorizationInput"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      code: '',
      email: '',
      error: '',
      showCode: false,
      showPassword: false,
      device: {},
      isLoader: false
    }
    this.onIds = this.onIds.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillMount() {
    OneSignal.configure()
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onIds(device) {
    console.log('Device info: ', device)
    this.setState({ device })
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map')
    return true
  }

  login = () => {
    const { login, password, code, device } = this.state

    this.setState({ isLoader: true })

    return services.login({ login, password, code })
      .then(res => {
        const { message, email, error, token } = res

        this.setState({ isLoader: false, code: '', error: '' })

        if (message === 'code') {
          return this.setState({ showCode: true, email })
        }

        if (message !== 'OK') {
          return this.setState({ error: error || message })
        }

        return AsyncStorage.setItem('windToken', token)
          .then(() => {
            this.props.updateReduxState({ menuRule: 'logged' })
            services.saveNotificationToken(device.userId)
            return this.props.navigation.navigate('Map')
          })

      })
      .catch((error) => {
        this.setState({ isLoader: false })
        console.error(error)
      })
  }

  render() {
    const { showPassword, showCode, code, email, error, login, password, isLoader } = this.state

    if (showCode) {
      return (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.mainContainer}>
            <View style={styles.container}>

              <AuthorizationInput
                icon='lock-outline'
                placeholder={"code from " + email}
                value={code}
                onChangeText={(code) => this.setState({ code })}
              />

              {error ? <Text style={{ textAlign: 'center', color: 'red' }}> {error}</Text> : null}

              <View style={styles.rowContainer}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Send'
                  color='#fff'
                  onPress={() => {
                    this.login()
                  }}/>
              </View>
            </View>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.mainContainer}>
            <View style={styles.container}>

              <AuthorizationInput
                icon='perm-identity'
                placeholder="Username"
                value={login}
                onChangeText={(login) => this.setState({ login })}
              />

              <AuthorizationInput
                icon='lock-outline'
                placeholder="Password"
                value={password}
                secureTextEntry={!showPassword}
                isPassword
                pressEye={() => this.setState({ showPassword: !showPassword })}
                onChangeText={(password) => this.setState({ password })}
              />

              {error ? <Text style={{ textAlign: 'center', color: 'red' }}> {error}</Text> : null}

              <View style={styles.rowContainer}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  // borderRadius={50}
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Login'
                  color={'#fff'}
                  onPress={() => {
                    this.setState({ isLoader: true })
                    this.login()
                  }}/>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.textContainer}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Register')
                }}>
                <Text style={styles.secondaryTextContainer}>You can register here.</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.textContainer}>Forgot your password?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ChangePassword')
                }}>
                <Text style={styles.secondaryTextContainer}>You can reset it here.</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      )
    }
  }
}

export default connect(null, actions)(Login)

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 2,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "80%",
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
