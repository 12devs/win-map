import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';

class Navigation extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => Actions.Register()
          }>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => Actions.Login()
          }>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => Actions.Main()
          }>
          <Text style={styles.submitButtonText}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => AsyncStorage.setItem('windToken', '')
          }>
          <Text style={styles.submitButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => Actions.Test()
          }>
          <Text style={styles.submitButtonText}>Test</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
    flex: 1,
  },
  submitButtonText: {
    color: 'white'
  }
});
