import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import actions from "../../actions/index"
import { connect } from "react-redux"
import icons from '../icons'

const { width } = Dimensions.get('window')

class Back extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.touchable}
                          onPress={() => {
                            this.props.updateReduxState({ info: { point: null, type: null } })
                            this.props.navigation.navigate('Map')
                          }}>
          <Image
            source={{ uri: icons.back }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, actions)(Back)

const styles = StyleSheet.create({
  touchable: {
    padding: 5,
    marginLeft: width * 0.04
  },
  image: {
    width: 25,
    height: 25,
    tintColor: '#fff'
  }
})
