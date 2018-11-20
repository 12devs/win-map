import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import actions from "../../actions/index";
import { connect } from "react-redux";
import { calcMapRegionAll } from '../../utils';
import icons from '../icons';
import service from '../../services';

class Navigation extends Component {

  deleteAllMarkers = () => {
    return service.deleteAllPoints().then(() => {
      this.props.updateReduxState({
        places: [],
        dangers: [],
      });
    });
  };

  render() {
    return (
      <View style={{ marginTop: 70 }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={
              () => {
                const mapRegion = calcMapRegionAll([...this.props.places, ...this.props.dangers]);
                if (mapRegion) {
                  this.props.updateReduxState({ mapRegion });
                }
              }}>
            <Image
              style={styles.image}
              source={{
                uri: icons.marker
              }}/>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={
              () => {
                if (this.props.viewType === 'Current') {
                  this.props.updateReduxState({ viewType: 'Historical' });
                } else {
                  this.props.updateReduxState({ viewType: 'Current' });
                }
              }
            }>
            <Image
              style={styles.image}
              source={{
                uri: icons.clock
              }}/>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              Alert.alert(
                'Alert',
                'Do you really want to delete all markers?',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  {
                    text: 'OK', onPress: () => {
                      console.log('OK Pressed');
                      this.deleteAllMarkers();
                    }
                  },
                ],
                { cancelable: false }
              );
            }}>
            <Image
              style={styles.image}
              source={{
                uri: icons.markerOff
              }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    viewType: state.get('viewType'),
  };
}

export default connect(mapStateToProps, actions)(Navigation);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    margin: 10,
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    backgroundColor: '#fff',
    elevation: 5
  },
  image: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#00498f',
  }
});
