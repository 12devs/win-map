import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index';
import services from "../services/index";
import {
  StyleSheet,
  TextInput,
  View,
  Modal, Text
} from 'react-native';
import { Header, Button } from 'react-native-elements';
import Loader from './Loader';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
      isSentButton: false,
      error: ''
    };
    this.addMarker = this.addMarker.bind(this);
    this.markerType = this.markerType.bind(this);
  }

  addMarker() {
    const { latlng } = this.props.savePointSettings;
    const { markerType } = this.props;
    const { name } = this.state;

    this.setState({ isSentButton: true });

    if (!name) {
      return this.state;
    }

    let key;
    if (markerType === 'Danger') {
      key = 'danger';
    } else {
      key = 'place';
    }

    let lngCorrect = latlng.lng;
    lngCorrect = lngCorrect % 360;
    if (lngCorrect > 180) {
      lngCorrect -= 360;
    }
    if (lngCorrect < -180) {
      lngCorrect += 360;
    }
    return services.savePoint({
      [key]: {
        lat: latlng.lat,
        lng: lngCorrect,
        name
      },
      stations: [...this.props.stations]
    })
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
      });
  };

  markerType(markerType) {
    this.props.updateReduxState({ markerType: markerType });
  };

  render() {

    return (

      <View style={{ height: '100%', backgroundColor: '#fff' }}>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>Enter marker name:</Text>
        </View>
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
  };
}

export default connect(mapStateToProps, actions)(Details);

const styles = StyleSheet.create({
  input: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#3D6DCC',
    borderWidth: 1,
    borderRadius: 50
  },
});
