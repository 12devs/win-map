import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index';
import services from "../services/index";
import hasItem from '../utils/asyncStorage';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import icons from './icons';

const { width } = Dimensions.get('window');

class SentPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
      isSentButton: false,
      error: ''
    };
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker = async () => {
    const { latlng } = this.props.savePointSettings;
    const { markerType, addPoint } = this.props;
    const { name } = addPoint;
    const isToken = await hasItem('windToken');
    let key;
    let lngCorrect = latlng.lng;
    lngCorrect = lngCorrect % 360;

    if (name) {
      this.props.updateReduxState({ addPoint: { isSentButton: true } });
    }
    else {
      return this.props.updateReduxState({ addPoint: { name: '', error: 'Enter name of point!' } });
    }

    if (markerType === 'Danger') {
      key = 'danger';
    }
    else {
      key = 'place';
    }

    if (lngCorrect > 180) {
      lngCorrect -= 360;
    }
    if (lngCorrect < -180) {
      lngCorrect += 360;
    }

    const query = { [key]: { lat: latlng.lat, lng: lngCorrect, name }, stations: [...this.props.stations] };

    if (isToken) {
      return services.savePoint(query)
        .then(res => {
          const { danger, place } = res;
          let { places, dangers, stationsData, stations } = this.props;
          stationsData = { ...stationsData, ...res.stationsData };

          if (danger) {
            dangers.push(danger);
          }
          if (place) {
            places.push(place);
          }

          stations.push(...Object.keys((res.stationsData || {})));
          this.props.updateReduxState({
            places,
            dangers,
            stationsData,
            stations,
            savePointSettings: { show: false }
          });
          this.props.updateStatistic();
        });
    }
    return services.pointInfo(query)
      .then(res => {
        this.helperAddPoint(res);
      });
  };

  helperAddPoint = (res) => {
    const { danger, place } = res;
    let { places, dangers, stationsData, stations } = this.props;

    if (stationsData.size) stationsData = { ...stationsData, ...res.stationsData };
    else stationsData = res.stationsData;

    if (danger) {
      dangers = [...dangers, danger];
    }

    if (place) {
      places = [...places, place];
    }
    stations.push(...Object.keys((res.stationsData || {})));

    this.props.updateReduxState({
      places,
      dangers,
      stationsData,
      stations,
      savePointSettings: { show: false }
    });

    return this.props.updateStatistic();
  };

  render() {
    const { addPoint } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        {!addPoint.isSentButton ?
          <TouchableOpacity
            style={{ padding: 5, marginRight: width * 0.04 }}
            onPress={async () => {
              await this.addMarker();
              if (addPoint.name !== '') {
                this.props.navigation.navigate('Map');
              }
            }}
          >
            <Image
              source={{ uri: icons.sent }}
              style={{ width: 25, height: 25, tintColor: '#fff' }}
            />
          </TouchableOpacity> : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    markerType: state.get('markerType'),
    info: state.get('info'),
    notificationSettings: state.get('notificationSettings'),
    savePointSettings: state.get('savePointSettings'),
    stationsData: state.get('stationsData'),
    addPoint: state.get('addPoint'),
  };
}

export default connect(mapStateToProps, actions)(SentPoint);
