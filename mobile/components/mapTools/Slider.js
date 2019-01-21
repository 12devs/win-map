import React, { Component } from 'react'
import { StyleSheet, Slider, } from 'react-native'
import actions from "../../actions/index"
import { connect } from "react-redux"

class Navigation extends Component {

  change(value) {
    this.props.updateReduxState({ scaleWind: parseFloat(value) })
  }

  render() {
    return (
      <Slider
        minimumTrackTintColor={'#3D6DCC'}
        thumbTintColor={'#00498f'}
        style={styles.submitButton}
        step={1}
        maximumValue={100000}
        onValueChange={this.change.bind(this)}
        value={this.props.scaleWind}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    scaleWind: state.get('scaleWind'),
  }
}

export default connect(mapStateToProps, actions)(Navigation)

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 30,
  },

})
