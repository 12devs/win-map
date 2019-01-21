import React, { Component } from 'react';
import { calcMapRegionOne } from '../utils/utils';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import actions from "../actions/index";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';
import services from '../services/index';
import { Button, Card, Divider, Icon } from 'react-native-elements';
import Loader from './Loader';
import { Table, Row, Rows } from 'react-native-table-component';
import hasItem from '../utils/asyncStorage';
import Overlay from 'react-native-modal-overlay';

class PointSettings extends Component {
  constructor() {
    super();
    this.state = {
      isDelButton: false,
      tableHead: ['Danger name', 'In danger now', 'In danger for a period(days)'],
      modalVisible: false,
      markerName: '',
      dangerRadius: 0,
    };
    this.delMarker = this.delMarker.bind(this);
    this.updatePoint = this.updatePoint.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map');
    return true;
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  delMarker = async () => {
    const { point, type } = this.props.info;
    const { id } = point;
    const isToken = await hasItem('windToken');

    if (isToken) {
      return services.deletePoint({ [type]: { id } })
        .then(() => {
          return this.delHelper(type, id);
        });
    } else {
      return this.delHelper(type, id);
    }
  };

  delHelper = (type, id) => {
    if (type === 'place') {
      const places = this.props.places.filter(el => !(el.id === id));
      this.props.updateReduxState({ places, info: { point: null, type: null } });
    }
    if (type === 'danger') {
      const dangers = this.props.dangers.filter(el => !(el.id === id));
      this.props.updateReduxState({ dangers, info: { point: null, type: null } });
      this.props.updateStatistic();
    }
  };

  updatePoint = async () => {
    const { point, type } = this.props.info;
    const { markerName, dangerRadius } = this.state;
    const hasToken = await hasItem('windToken');

    if (dangerRadius && (dangerRadius < 0 || (isNaN(Number(dangerRadius))))) {
      return;
    }

    if (dangerRadius) {
      point.dangerRadius = parseInt(dangerRadius, 10);
    }

    if (hasToken) {
      return services.updatePoint({
        [type]: point,
      })
        .then(() => {
          this.updatePointHelper(type, point, markerName, dangerRadius);
        });
    } else {
      this.updatePointHelper(type, point, markerName, dangerRadius);
    }
  };

  updatePointHelper = (type, point, markerName, dangerRadius) => {
    let markers = this.props[`${type}s`].map(elem => {
      if (elem.id === point.id) {
        if (markerName) {
          console.log('name');
          elem.name = markerName;
        }
        if (dangerRadius) {
          elem.dangerRadius = parseInt(dangerRadius, 10);
        }
      }
      return elem;
    });

    this.props.updateReduxState({ [`${type}s`]: markers });
  };

  render() {
    let { info, statistic } = this.props;
    let { point, type } = info;
    let { isDelButton, modalVisible, markerName, dangerRadius } = this.state;
    if (!point) {
      point = {};
    }

    return (
      <View>
        <Overlay visible={modalVisible}
                 onClose={() => this.setModalVisible(false)}
                 containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.78)' }}
                 closeOnTouchOutside
                 animationType='zoomIn'>
          <View>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Marker name:</Text>
              <View style={styles.inputContainer}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                  <TextInput style={styles.input}
                             value={markerName}
                             underlineColorAndroid="transparent"
                             placeholder={point.name}
                             placeholderTextColor="#3D6DCC"
                             autoCapitalize="none"
                             onChangeText={(markerName) => this.setState({ markerName })}/>
                  <View style={styles.iconContainer}>
                    <Icon name='location-on' color='#3D6DCC'/>
                  </View>
                </View>
              </View>

              {point.dangerRadius &&
              <View>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Wind radius:</Text>
                <View style={styles.inputContainer}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                    <TextInput style={styles.input}
                               value={dangerRadius}
                               underlineColorAndroid="transparent"
                               placeholder={point.dangerRadius.toString()}
                               placeholderTextColor="#3D6DCC"
                               autoCapitalize="none"
                               onChangeText={(dangerRadius) => this.setState({ dangerRadius })}/>
                    <View style={styles.iconContainer}>
                      <Icon name='network-wifi' color='#3D6DCC'/>
                    </View>
                  </View>
                </View>
              </View>}

              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                <Button
                  containerViewStyle={styles.buttonContainer}
                  backgroundColor={'#3D6DCC'}
                  borderRadius={50}
                  title='Change'
                  color={'#fff'}
                  onPress={() => {
                    this.updatePoint();
                    this.setModalVisible(!this.state.modalVisible);
                  }}/>
              </View>

            </View>
          </View>
        </Overlay>
        {
          !isDelButton ?
            <ScrollView contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Card containerStyle={{ elevation: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <Icon name='location-on' color={type === 'place' ? '#3D6DCC' : 'red'}/>
                  <Text onPress={() => {
                    this.setModalVisible(true);
                  }} style={{ textAlign: 'center', fontSize: 20 }}>{point.name}</Text>
                  <Icon onPress={() => {
                    this.setModalVisible(true);
                  }} name='create' color='gray' size={18} containerStyle={{ marginLeft: 10 }}/>
                </View>
                {point.dangerRadius &&
                <Text style={{ textAlign: 'center' }}>Wind Radius: {point.dangerRadius.toString()} m</Text>}
                {/*<Text style={{ textAlign: 'center' }}>{`(${point.lat}, ${point.lng})`}</Text>*/}
                <Divider style={{ margin: 20, marginLeft: 40, marginRight: 40 }}/>
                <View>
                  <WindRoseChart stationId={point.station_id}/>
                </View>
              </Card>

              {
                type === 'place' ?
                  <Card containerStyle={{ elevation: 5 }}>
                    <Table borderStyle={{ borderColor: 'transparent' }}>
                      <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                      <Divider style={{ margin: 5, marginLeft: 0, marginRight: 0 }}/>
                      {
                        statistic.get(point.id).map((danger, id) =>
                          <Row key={id}
                               data={[danger.get('dangerName'), danger.get('currently') === true ? 'yes' : 'no', danger.get('period')]}
                               textStyle={styles.text}/>)
                      }
                    </Table>
                  </Card> : null
              }

              <Button
                containerViewStyle={{ margin: 10, marginTop: 20 }}
                backgroundColor={'#3D6DCC'}
                // large
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
                // large
                borderRadius={50}
                icon={{ name: 'location-off' }}
                title='Remove point'
                onPress={() => {
                  Alert.alert(
                    'Alert',
                    'Do you really want to delete marker?',
                    [
                      { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
                      {
                        text: 'Yes', onPress: () => {
                          this.setState({ isSentButton: true });
                          this.delMarker()
                            .then(() => {
                              this.props.updateReduxState({ info: { point: null, type: null } });
                              this.props.navigation.navigate('Map');
                            });
                        }
                      },
                    ],
                    { cancelable: false }
                  );

                }}/>
            </ScrollView> :
            <View style={{ height: '100%' }}>
              <Loader size='large' color='#3D6DCC'/>
            </View>
        }
      </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
    statistic: state.get('statistic'),
  };
}

export default connect(mapStateToProps, actions)(PointSettings);

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    // backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: {
    height: 50,
    backgroundColor: '#fff'
  },
  iconContainer: {
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    margin: 6,
    textAlign: 'center'
  },
  input: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "80%",
  },
  buttonContainer: {
    marginTop: 35,
    marginBottom: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: '#3D6DCC'
  }
});
