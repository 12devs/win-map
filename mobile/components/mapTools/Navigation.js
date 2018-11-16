import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import actions from "../../actions/index";
import { connect } from "react-redux";
import { calcMapRegionAll } from '../../utils';
import icons from '../icons';

class Navigation extends Component {

  render() {
    return (
      <View style={{ marginTop: 70 }}>
        <View style={styles.searchContainer}>
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

        <View style={styles.searchContainer}>
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
    flexDirection: 'row',
    alignItems: 'stretch',
    flex: 1,
    width: 400,
  },
  searchContainer: {
    paddingBottom: 0,
    margin: 5,
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "88%",
    marginLeft: '-10%',
    paddingLeft: '10%',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 140,
    flex: 1,
  },
  submitButtonText: {
    color: 'white'
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
