import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import actions from "../../actions/index"
import { connect } from "react-redux"
import icons from '../icons'
import service from '../../services'
import hasItem from "../../utils/asyncStorage"

class DeleteMarkers extends Component {

  deleteAllMarkers = async () => {
    const isToken = await hasItem('windToken')

    if (isToken) {
      return service.deleteAllPoints().then(() => {
        return this.props.updateReduxState({
          places: [],
          dangers: [],
          notificationSettings: []
        })
      })
    }
    return this.props.updateReduxState({ places: [], dangers: [], notificationSettings: [] })
  }

  render() {
    return (
      <View style={{ marginTop: 70 }}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Alert.alert(
              'Alert',
              'Do you want to delete all your markers?',
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
