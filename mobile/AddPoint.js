import React from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import services from "./services";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class AddPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
    };
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker(markerType) {
    const { latlng } = this.props.savePointSettings;
    const { name } = this.state;

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
        let places = this.props.places;
        let dangers = this.props.dangers;
        let stationsData = this.props.stationsData;
        const stations = this.props.stations;
        stationsData = { ...stationsData, ...res.stationsData };
        if (danger) {
          dangers.push(danger);
        }
        if (place) {
          places.push(place);
        }
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({ places, dangers, stationsData, stations });
        this.props.updateReduxState({ savePointSettings: { show: false } });
      });
  };

  render() {
    const { show } = this.props.savePointSettings;

    if (!show) {
      return null;
    }
    console.log(this.state.name);
    return (


      <View style={styles.container}>
        <Text style={styles.submitButtonText}> {JSON.stringify(this.props.savePointSettings, null, 4)} </Text>
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder="Name"
                   placeholderTextColor="#9a73ef"
                   autoCapitalize="none"
                   onChangeText={(e) => {
                     this.setState({ name: e });
                   }}/>
        <Button
          onPress={() => {
            this.addMarker('My Place');
            Actions.Main();
          }}
          title='My Place'/>
        <Button
          onPress={() => {
            this.addMarker('Danger');
            Actions.Main();
          }}
          title='Danger'
          color='red'/>
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

export default connect(mapStateToProps, actions)(AddPoint);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center"
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    width: 10,
    height: 10,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  input: {
    margin: 5,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    // flex:1
  },
});
