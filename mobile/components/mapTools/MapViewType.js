import RadioForm from 'react-native-simple-radio-button'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import actions from "../../actions/index"
import { connect } from "react-redux"
import _ from 'lodash'
import icons from '../icons'

class MapViewType extends Component {
  constructor() {
    super()
    this.state = {
      isShow: false
    }
  }

  render() {
    const { isShow } = this.state
    const radio_props = [
      { label: 'standard', value: 'standard' },
      { label: 'satellite', value: 'satellite' },
      { label: 'hybrid', value: 'hybrid' },
    ]
    const index = _.findIndex(radio_props, o => (o.value === this.props.mapViewType))

    return (
      <View>
        {!isShow ?
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              this.setState({ isShow: !isShow })
            }}>
            <Image style={styles.image} source={{ uri: icons.layers }}/>
          </TouchableOpacity> : null}

        {isShow ?
          <View style={styles.layersContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'right', marginBottom: 10 }}>Map Layers</Text>
            </View>
            <RadioForm
              buttonColor={'#00498f'}
              radio_props={radio_props}
              selectedButtonColor={'#00498f'}
              initial={index}
              onPress={(value) => {
                this.props.updateReduxState({ mapViewType: value })
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
              <TouchableOpacity
                style={styles.closeContainer}
                onPress={() => {
                  this.setState({ isShow: !isShow })
                }}>
                <Text style={{ color: '#00498f' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View> : null}
      </View>

    )
  }
}

function mapStateToProps(state) {
  return {
    mapViewType: state.get('mapViewType'),
  }
}

export default connect(mapStateToProps, actions)(MapViewType)

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#00498f',
  },
  layersContainer: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    elevation: 3,
    margin: 3
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    elevation: 5,
    margin: 10,
    marginRight: 5,
    backgroundColor: '#fff'
  },
  closeContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#00498f',
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20
  }
})
