import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import actions from "../../actions/index"
import { connect } from "react-redux"
import icons from '../icons'
import service from '../../services'

class DeleteMarkers extends Component {

  deleteAllMarkers = () => {
    return service.deleteAllPoints().then(() => {
      this.props.updateReduxState({
        places: [],
        dangers: [],
      })
    })
  }

  render() {
    return (
      <View style={{ marginTop: 70 }}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Alert.alert(
              'Alert',
              'Do you really want to delete all markers?',
              [
                { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    console.log('Yes Pressed')
                    this.deleteAllMarkers()
                  }
                },
              ],
              { cancelable: false }
            )
          }}>
          <Image
            style={styles.image}
            source={{
              uri: icons.markerOff
            }}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, actions)(DeleteMarkers)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    margin: 10,
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    elevation: 5,
    margin: 10,
    marginRight: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#00498f',
  }
})
