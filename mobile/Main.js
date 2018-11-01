import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import actions from './actions';
import { connect } from "react-redux";
import Map from './Map';
import ModalEX from './ModalEX'
import services from "./services";

class Main extends Component {

  componentDidMount = () => {
    return services.getInfo()
      .then(res => {
        if (res.unauthorized){
          return this.props.navigation.navigate('Login')
        }
        return this.props.updateReduxState(res)
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Map style={{flex:15}}/>
        <ModalEX/>
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
  };
}

export default connect(mapStateToProps, actions)(Main);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 15,
  },
  map: {
    // maxHeight: '40%',
    flex: 10,
  }
});
