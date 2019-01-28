import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import services from '../services/index'
import { Button, Icon } from 'react-native-elements'

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

    if (password === repeatPassword) {
      services.changePassword({ login, password, changePasswordCode })
        .then((res) => {
          const { error, message, email } = res

          this.setState({ isLoader: false })
          if (message === 'code') {
            this.setState({ error: '' })
            return this.setState({ email, showCode: true })
          }
          if (message !== 'OK') {
            error ? this.setState({ error }) : this.setState({ error: message })
          } else {
            return this.props.navigation.navigate('Login')
          }
        })
        .catch((error) => {
          this.setState({ isLoader: false })
          this.setState({ error: error.toString() })
        })
    } else {
      this.setState({ isLoader: false })
      this.setState({ error: 'Passwords do not match' })
    }
  }

  render() {
    const { showPassword, email, login, error, password, showRepeatPassword, repeatPassword, isLoader } = this.state

    if (this.state.showCode) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <View style={styles.iconContainer}>
                  <Icon name='lock-outline' color='#3D6DCC'/>
                </View>
                <TextInput style={styles.input}
                           value={this.state.code}
                           underlineColorAndroid="transparent"
                           placeholder={"code from " + email}
                           placeholderTextColor="#3D6DCC"
                           autoCapitalize="none"
                           onChangeText={(changePasswordCode) => this.setState({ changePasswordCode })}/>
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
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Send'
                  color={'#fff'}
                  onPress={() => {
                    this.setState({ isLoader: true })
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
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <View style={styles.iconContainer}>
                  <Icon name='mail-outline' color='#3D6DCC'/>
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
                           value={password}
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
                  <Icon name='lock-outline' color='#3D6DCC'/>
                </View>
                <TextInput style={styles.inputPassword}
                           underlineColorAndroid="transparent"
                           secureTextEntry={!showRepeatPassword}
                           placeholder="Repeat Password"
                           placeholderTextColor="#3D6DCC"
                           autoCapitalize="none"
                           value={repeatPassword}
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
              {error ? <Text style={{ textAlign: 'center', color: 'red' }}> {error}</Text> : null}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  // large
                  // borderRadius={50}
                  disabled={isLoader}
                  disabledStyle={{ backgroundColor: '#3D6DCC' }}
                  loading={isLoader}
                  title='Change'
                  color={'#fff'}
                  onPress={() => {
                    this.setState({ isLoader: true })
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
    // marginTop: 10,
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
  }
})
