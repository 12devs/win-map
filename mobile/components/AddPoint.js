import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  BackHandler
} from 'react-native';
import { Button } from 'react-native-elements';
import Loader from './Loader';

class AddPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
      error: ''
    };
    this.markerType = this.markerType.bind(this);
    this.props.updateReduxState({ addPoint: { name: '', error: '', isSentButton: false } });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map');
    return true;
  };

  markerType(markerType) {
    this.props.updateReduxState({ markerType: markerType });
  };

  render() {
    const { markerType, savePointSettings, addPoint } = this.props;
    const { show } = savePointSettings;

    return (
      <View>
        {(!addPoint.isSentButton) ?
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
                           this.props.updateReduxState({ addPoint: { name: e, error: '' } });
                         }}/>
              {addPoint.error ? <Text style={{ textAlign: 'center', color: 'red' }}> {addPoint.error}</Text> : null}
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
          </View> : <Loader size='large' color='#3D6DCC'/>}
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
    savePointSettings: state.get('savePointSettings'),
    stationsData: state.get('stationsData'),
    addPoint: state.get('addPoint'),
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
});
