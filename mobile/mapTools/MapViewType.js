import RadioForm from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import actions from "../actions/index";
import { connect } from "react-redux";
import _ from 'lodash';

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
    console.log(this.props.mapViewType);
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
                uri:
                  'data:image/png;base64,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',
              }}/>
          </TouchableOpacity> : null}

        {isShow ?
          <View style={{backgroundColor: 'white', padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isShow: !isShow });
              }}>
              <Text style={{ textAlign: 'right', marginBottom: 10 }}>X</Text>
            </TouchableOpacity>
            <RadioForm
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
  input: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    // flex:1
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  image: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#fff'
    // zIndex: 100
  },
  container: {
    backgroundColor: 'white',
  },
  imageContainer: {
    borderRadius: 80,
    backgroundColor: '#3D6DCC'
  },
});
