import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Slider,
  Image,
} from 'react-native';
import actions from "../actions/index";
import { connect } from "react-redux";
import { calcMapRegionAll } from '../utils';
import MapViewType from "./MapViewType";
import Search from './Search';
import { Callout } from "react-native-maps";

class Navigation extends Component {

  change(value) {
    this.props.updateReduxState({ scaleWind: parseFloat(value) });
  }

  render() {
    return (
      <View style={{marginTop: 70}}>

       {/* <View style={styles.container}>

          <MapViewType style={styles.submitButton}/>


        </View>*/}
        <Slider
          style={styles.submitButton}
          step={1}
          maximumValue={10000000}
          onValueChange={this.change.bind(this)}
          value={this.props.scaleWind}
        />

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    info: state.get('info'),
    scaleWind: state.get('scaleWind'),
  };
}

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    width: 400,
  },
  searchContainer: {
    // marginTop: 90,
    paddingBottom: 0,
    margin: 10,
    marginRight: 50,
    // flexDirection: "row",
    backgroundColor: 'green'
  },
  calloutView: {
    flexDirection: "row",
    // justifyContent: 'right',
    backgroundColor: "rgba(255, 255, 255, 1)",
    // borderRadius: 10,
    width: "88%",
    marginLeft: '-10%',
    paddingLeft: '10%',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    // backgroundColor: "blue",
    // padding: 20,
    // width: this.state.fadeAnim
    // marginLeft: "10%",
    // marginRight: "10%",
    // marginTop: 20,
  },
  submitButton: {
    // backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 30,
    flex: 1,
    // paddingBottom: 0,
    // marginBottom: 0
  },
  submitButtonText: {
    color: 'white'
  },
  imageContainer: {
    borderRadius: 80, backgroundColor: 'white'
  },
  image: {
    width: 20,
    height: 20,
    margin: 15,
    // zIndex: 100
  }
});
