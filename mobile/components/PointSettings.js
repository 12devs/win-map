import React, { Component } from 'react';
import { calcMapRegionOne } from '../utils';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler
} from 'react-native';
import actions from "../actions/index";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';
import services from '../services/index';
import { Header, Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class PointSettings extends Component {
  constructor() {
    super();
    this.delMarker = this.delMarker.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map');
    return true;
  };

  delMarker() {
    const { point, type } = this.props.info;
    const { id } = point;
    return services.deletePoint({
      [type]: { id },
    })
      .then(res => {
        console.log(res);
        if (type === 'place') {
          const places = this.props.places.filter(el => !(el.id === id));
          this.props.updateReduxState({ places, info: { point: null, type: null } });
        }
        if (type === 'danger') {
          const dangers = this.props.dangers.filter(el => !(el.id === id));
          this.props.updateReduxState({ dangers, info: { point: null, type: null } });
        }
      });
  };

  render() {
    let { point, type } = this.props.info;
     if (!point){
       point = {}
     }
    const show = !!(point && type);

    return (
      <View>
        <ScrollView style={{ height: height * 0.85 }}>
          <Text style={{ textAlign: 'center' }}>Name: {point.name}</Text>
          <Text style={{ textAlign: 'center' }}>Type: {type}</Text>
          <Text style={{ textAlign: 'center' }}>Lat: {point.lat}</Text>
          <Text style={{ textAlign: 'center' }}>Lng: {point.lng}</Text>
          <WindRoseChart stationId={point.station_id}/>
          <Button
            containerViewStyle={{ margin: 10 }}
            backgroundColor={'#3D6DCC'}
            large
            borderRadius={50}
            icon={{ name: 'location-on' }}
            title='Go to marker'
            onPress={() => {
              this.props.navigation.navigate('Map');
              const mapRegion = calcMapRegionOne(point);
              if (mapRegion) {
                this.props.updateReduxState({ mapRegion, info: { point: null, type: null } });
              }
            }}/>
          <Button
            containerViewStyle={{ margin: 10 }}
            backgroundColor={'red'}
            large
            borderRadius={50}
            icon={{ name: 'location-off' }}
            title='Remove point'
            onPress={() => {
              this.delMarker()
                .then(() => {
                  this.props.updateReduxState({ info: { point: null, type: null } });
                });
              this.props.navigation.navigate('Map');
            }}/>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(PointSettings);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  button: {
    margin: 20
  }
});
