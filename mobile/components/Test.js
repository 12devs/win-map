import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import services from '../services/index'
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import actions from "../actions/index";
import { connect } from "react-redux";

class Test extends Component {
  state = {
    token:'',
    info: {}
  };
  componentDidMount = () => {
    return AsyncStorage.getItem('windToken')
      .then(windToken => {
        this.setState({token: windToken});
        return services.getInfo()
          .then(res => {
            return this.props.updateReduxState(res)
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(this.props.notificationSettings, null, 4)}</Text>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    savePointSettings: state.get('savePointSettings'),
    notifications: state.get('notifications'),
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    notificationSettings: state.get('notificationSettings'),
  };
}

export default connect(mapStateToProps, actions)(Test);

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
});
