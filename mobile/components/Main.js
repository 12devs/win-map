import React, { Component } from 'react';
import { View, StyleSheet, NetInfo, Dimensions, Text } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import Map from './Map';
import services from "../services/index";
import { calcMapRegionAll } from '../utils';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class Main extends Component {

  componentDidMount = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    if (!this.props.isGetMainData) {
      return services.getInfo()
        .then(res => {
          if (res.unauthorized) {
            return this.props.navigation.navigate('Login');
          }
          const mapRegion = calcMapRegionAll([...res.places, ...res.dangers]);
          if (mapRegion) {
            res.mapRegion = mapRegion;
          }
          this.props.updateReduxState({ ...res, isGetMainData: true });
          return this.props.updateStatistic();
        });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.updateReduxState({ isConnected });
    } else {
      this.props.updateReduxState({ isConnected });
    }
  };

  render() {
    const { isConnected } = this.props;
    if (!isConnected) {
      return <MiniOfflineSign/>;
    }
    else
      return (
        <View style={styles.container}>
          <Map style={styles.map} navigation={this.props.navigation}/>
        </View>
      );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    isGetMainData: state.get('isGetMainData'),
    isConnected: state.get('isConnected'),
  };
}

export default connect(mapStateToProps, actions)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
  },
  offlineText: { color: '#fff' }
});
