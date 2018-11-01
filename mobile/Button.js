import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

class Button extends Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.submitButton}
        onPress={this.props.onPress}>
        <Text style={styles.submitButtonText}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 25,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
});
