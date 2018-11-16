import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView, Dimensions, TouchableOpacity, Image
} from 'react-native';
import actions from "../../actions/index";
import { connect } from "react-redux";
import icons from '../icons';

const { width, height } = Dimensions.get('window');

class Back extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ padding: 5, marginLeft: width * 0.02 }}
                          onPress={() => {
                            this.props.updateReduxState({ info: { point: null, type: null } });
                            this.props.navigation.navigate('Map');
                          }}>
          <Image
            source={{ uri: icons.back }}
            style={{ width: 25, height: 25, tintColor: '#fff' }}
          />
        </TouchableOpacity>
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
  };
}

export default connect(mapStateToProps, actions)(Back);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  button: {
    margin: 20
  }
});
