import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import services from '../services/index'
import { Button, Icon } from 'react-native-elements'
import AuthorizationInput from "./AuthorizationInput"

class ChangePassword extends Component {
  state = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
    error: '',
    changePasswordCode: '',
    showCode: false,
    showPassword: false,
    showRepeatPassword: false,
    isLoader: false
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map')
    return true
  }

  changePassword = () => {
    const { login, password, repeatPassword, changePasswordCode } = this.state
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const validPassword = password.match(passwordRegex)

    if (!password || !login || !repeatPassword) {
      return this.setState({ error: 'Missing params' })
    }

    if (!validPassword) {
      return this.setState({
        error: 'Please, enter a password that meets all of the requirements:\n\t' +
          '* at least 8 characters\n\t' +
          '* at least 1 number\n\t' +
          '* at least 1 upper-case character\n\t' +
          '* at  least 1 lower-case character'
      })
    }

    if (password !== repeatPassword) {
     return this.setState({ error: 'Passwords do not match' })
    }

    this.setState({ isLoader: true })

    services.changePassword({ login, password, changePasswordCode })
      .then((res) => {
        const { error, message, email } = res

        this.setState({ isLoader: false })

        if (message === 'code') {
          return this.setState({ email, showCode: true, error: '' })
        }

        if (message === 'OK') {
          return this.props.navigation.navigate('Login')
        }
        this.setState({ error: error || message })

      })
      .catch((error) => {
        this.setState({ error: error.toString(), isLoader: false })
      })

  }

  render() {
    const { showPassword, email, login, error, password, showRepeatPassword, repeatPassword, isLoader } = this.state

    if (this.state.showCode) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.mainContainer}>
            <View style={styles.container}>

              <AuthorizationInput
                icon='lock-outline'
                placeholder={"code from " + email}
                value={this.state.code}
                onChangeText={(changePasswordCode) => this.setState({ changePasswordCode })}
              />

              {this.state.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {error}</Text> : null}

              <View style={styles.rowContainer}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Send'
                  color={'#fff'}
                  onPress={() => {
                    this.changePassword()
                  }}/>
              </View>

            </View>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
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

              <AuthorizationInput
                icon='lock-outline'
                placeholder="Repeat Password"
                value={repeatPassword}
                secureTextEntry={!showRepeatPassword}
                isPassword
                pressEye={() => this.setState({ showRepeatPassword: !showRepeatPassword })}
                onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
              />

              <View style={styles.rowContainer}>
                {error ? <Text style={styles.textError}> {error}</Text> : null}
              </View>

              <View style={styles.rowContainer}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Change'
                  color={'#fff'}
                  onPress={() => {
                    this.changePassword()
                  }}/>
              </View>

            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Login')
              }}
            >
              <Text style={styles.textContainer}>You can login here.</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      )
    }
  }
}

export default ChangePassword

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPassword: {
    // marginTop: 10,
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "65%",
  },
  textContainer: {
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#3D6DCC',
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
  },
  textError: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  }
})
