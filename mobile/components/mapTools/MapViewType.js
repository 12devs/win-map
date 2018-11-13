import RadioForm from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import actions from "../../actions/index";
import { connect } from "react-redux";
import _ from 'lodash';
import icons from '../icons';

class MapViewType extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false
    };
  }

  render() {
    const { isShow } = this.state;
    const radio_props = [
      { label: 'standard', value: 'standard' },
      { label: 'satellite', value: 'satellite' },
      { label: 'hybrid', value: 'hybrid' },
    ];
    const index = _.findIndex(radio_props, o => (o.value == this.props.mapViewType));

    return (
      <View>
        {!isShow ?
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              this.setState({ isShow: !isShow });
            }}>
            <Image
              style={styles.image}
              source={{
                uri: icons.layers
              }}/>
          </TouchableOpacity> : null}

        {isShow ?
          <View style={{
            backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 3, margin: 3
          }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isShow: !isShow });
              }}>
              <Text style={{ textAlign: 'right', marginBottom: 10 }}>X</Text>
            </TouchableOpacity>
            <RadioForm
              // buttonColor={'#00498f'}
              radio_props={radio_props}
              initial={index}
              onPress={(value) => {
                this.props.updateReduxState({ mapViewType: value });
              }}
            />
          </View> : null}
      </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    mapRegion: state.get('mapRegion'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    mapViewType: state.get('mapViewType'),
  };
}

export default connect(mapStateToProps, actions)(MapViewType);

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#00498f',
  },
  imageContainer: {
    padding: 2,
    borderRadius: 80,
    elevation: 5,
    margin: 5,
    marginRight: 2,
    backgroundColor: '#fff',
  },
});
