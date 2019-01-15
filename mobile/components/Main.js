import React, { Component } from 'react';
import { View, StyleSheet, NetInfo, Dimensions, Text, Alert } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import Map from './Map';
import services from "../services/index";
import { calcMapRegionAll } from '../utils/utils';
import Loader from './Loader';
import hasItem from '../utils/asyncStorage';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoad: true,
    };
  }

  componentDidMount = async () => {
    const hasToken = await hasItem('windToken');

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    if (hasToken) {
      if (!this.props.isGetMainData) {
        return services.getInfo()
          .then(res => {
            const mapRegion = calcMapRegionAll([...res.places, ...res.dangers]);

            if (mapRegion) {
              res.mapRegion = mapRegion;
            }
            this.props.updateReduxState({ ...res, isGetMainData: true });
            this.setState({ isLoad: false });
            return this.props.updateStatistic();
          });
      }
    }
   /* Alert.alert(
      'You are not registered!',
      'If you want to save markers and receive wind notifications you need to register.',
      [
        {
          text: 'Ok', onPress: () => {
            return this.props.navigation.navigate('Map');

          }, style: 'cancel'
        },
      ],
      { cancelable: false }
    );*/
    return this.setState({ isLoad: false });
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
    if (this.state.isLoad) {
      return <Loader size='large' color='#3D6DCC'/>;
    }
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
