import React from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import services from "./services";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // Button,
  Alert,
  TouchableHighlight,
  Modal
} from 'react-native';
import { FormInput, FormLabel, FormValidationMessage, Header, Button } from 'react-native-elements';

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

    if (!name) {
      return;
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
        this.props.updateReduxState({ places, dangers, stationsData, stations, savePointSettings: { show: false } });
      });
  };

  render() {
    const { show } = this.props.savePointSettings;

    if (!show) {
      return null;
    }
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          this.props.updateReduxState({ savePointSettings: { show: false } });
        }}>
        <Header
          leftComponent={{
            icon: 'arrow-back', color: '#fff',
            onPress: () => {
              this.props.updateReduxState({ savePointSettings: { show: false } });
            }
          }}
          centerComponent={{ text: 'Add Point', style: { color: '#fff', fontSize: 20 } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        />
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
          <View>
            {/*<Text>Pint Name</Text>*/}
            <TextInput style={styles.input}
                       allowFontScaling={true}
                       underlineColorAndroid="transparent"
                       placeholder="Point Name"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       onChangeText={(e) => {
                         this.setState({ name: e });
                       }}/>
            <Button
              containerViewStyle={{ margin: 10 }}
              backgroundColor={'#3D6DCC'}
              large
              borderRadius={50}
              icon={{ name: 'home' }}
              title='My Place'
              onPress={() => {
                this.addMarker('My Place');
              }}/>
            <Button
              // buttonStyle={{ elevation: 0 }}
              containerViewStyle={{ margin: 10 }}
              backgroundColor={'red'}
              large
              borderRadius={50}
              icon={{ name: 'error' }}
              title='Danger'
              onPress={() => {
                this.addMarker('Danger');
              }}/>
          </View>
        </View>
      </Modal>
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#3D6DCC',
    borderWidth: 1,
    borderRadius: 50
    // flex:1
  },
});
