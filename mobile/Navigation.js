import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, AsyncStorage } from 'react-native'

class Navigation extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => console.log('All Markers')
          }>
          <Text style={styles.submitButtonText}>All Markers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () =>console.log('View Type')
          }>
          <Text style={styles.submitButtonText}>View Type</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () =>console.log('Notifications')
          }>
          <Text style={styles.submitButtonText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => console.log('Subscription')
          }>
          <Text style={styles.submitButtonText}>Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => console.log('Map View')
          }>
          <Text style={styles.submitButtonText}>Map View</Text>
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
