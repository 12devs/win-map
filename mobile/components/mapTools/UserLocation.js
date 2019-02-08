import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import actions from "../../actions/index"
import { connect } from "react-redux"
import icons from '../icons'

class UserLocation extends Component {

  render() {
    return (
      <View style={{ marginTop: 140 }}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            this.props.location(true)
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: icons.gpsFixed }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, actions)(UserLocation)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    margin: 10,
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    elevation: 1,
    margin: 10,
    marginRight: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: 20,
    height: 20,
    margin: 10,
    tintColor: '#00498f',
  }
})
