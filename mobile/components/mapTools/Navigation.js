import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, } from 'react-native'
import { Toast } from "native-base"
import actions from "../../actions/index"
import { connect } from "react-redux"
import { calcMapRegionAll } from '../../utils/utils'
import icons from '../icons'

class Navigation extends Component {

  render() {
    return (
      <View style={{ marginTop: 70 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={
              () => {
                const mapRegion = calcMapRegionAll([...this.props.places, ...this.props.dangers])

                Toast.show({
                  text: 'View all markers',
                  duration: 1000,
                  position: 'center'
                })

                if (mapRegion) {
                  this.props.updateReduxState({ mapRegion })
                }
              }}>
            <Image
              style={styles.image}
              source={{
                uri: icons.marker
              }} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={
              () => {
                if (this.props.viewType === 'Current') {
                  Toast.show({
                    text: 'Historical mode',
                    duration: 1000,
                    position: 'center'
                  })

                  this.props.updateReduxState({ viewType: 'Historical' })
                } else {
                  Toast.show({
                    text: 'Current mode',
                    duration: 1000,
                    position: 'center'
                  })

                  this.props.updateReduxState({ viewType: 'Current' })
                }
              }
            }>
            <Image
              style={styles.image}
              source={{
                uri: icons.clock
              }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    viewType: state.get('viewType'),
  }
}

export default connect(mapStateToProps, actions)(Navigation)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    margin: 10,
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    backgroundColor: '#fff',
    elevation: 2
  },
  image: {
    width: 20,
    height: 20,
    margin: 10,
    tintColor: '#00498f',
  }
})
