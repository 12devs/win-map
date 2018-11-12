import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

export default class Loader extends Component {
  render() {
    const { size, color } = this.props;
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={size} color={color}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
