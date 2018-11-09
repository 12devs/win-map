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

class AddPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
    };
    this.addMarker = this.addMarker.bind(this);
    this.markerType = this.markerType.bind(this);
  }

   addMarker() {
     const { latlng } = this.props.savePointSettings;
     const { markerType } = this.props;
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

  markerType(markerType) {
    this.props.updateReduxState({ markerType: markerType });
  };

  render() {
    const { show } = this.props.savePointSettings;
    const { markerType } = this.props;

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
          rightComponent={{
            icon: 'done', color: '#fff',
            onPress: () => {
              this.addMarker();
            }
          }}
          centerComponent={{ text: 'Add Point', style: { color: '#fff', fontSize: 20 } }}
          outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        />
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
          <View>
            <Text style={{ textAlign: 'center', marginTop: 10 }}>Enter marker name:</Text>
            <TextInput style={styles.input}
                       allowFontScaling={true}
                       underlineColorAndroid="transparent"
                       placeholder="Marker Name"
                       placeholderTextColor="#3D6DCC"
                       autoCapitalize="none"
                       onChangeText={(e) => {
                         this.setState({ name: e });
                       }}/>
            <Text style={{ textAlign: 'center' }}>Choose marker type:</Text>
            <Button
              containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: '#3D6DCC' }}
              backgroundColor={markerType === 'Danger' ? '#fff' : '#3D6DCC'}
              large
              borderRadius={50}
              icon={markerType === 'Danger' ? { name: 'home', color: '#3D6DCC' } : { name: 'home', color: '#fff' }}
              title='My Place'
              color={markerType === 'Danger' ? '#3D6DCC' : '#fff'}
              onPress={() => {
                this.markerType('My Place');
              }}/>
            <Button
              containerViewStyle={{ margin: 10, borderWidth: 1, borderColor: 'red' }}
              backgroundColor={markerType !== 'Danger' ? '#fff' : 'red'}
              large
              borderRadius={50}
              icon={markerType !== 'Danger' ? { name: 'error', color: 'red' } : { name: 'error', color: '#fff' }}
              color={markerType !== 'Danger' ? 'red' : '#fff'}
              title='Danger'
              onPress={() => {
                this.markerType('Danger');
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
