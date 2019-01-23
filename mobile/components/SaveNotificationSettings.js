import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions/index'
import services from "../services/index"
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import icons from './icons'

const { width } = Dimensions.get('window')


class SaveNotificationSettings extends React.Component {

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          style={{ padding: 5, marginRight: width * 0.04 }}
          onPress={
            () => services.sendSubscriptions({ subscriptions: this.props.notificationSettings })
              .then(res => {
                console.log(res)
                Alert.alert(
                  'Alert',
                  'Settings have been saved!',
                  [
                    {
                      text: 'Ok', onPress: () => {
                        return this.props.navigation.navigate('Map')

                      }, style: 'cancel'
                    },
                  ],
                  { cancelable: false }
                )
              })
          }
        >
          <Image
            source={{ uri: icons.sent }}
            style={{ width: 25, height: 25, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
  }
}

export default connect(mapStateToProps, actions)(SaveNotificationSettings)
