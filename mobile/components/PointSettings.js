import React, { Component } from 'react';
import { calcMapRegionOne } from '../utils';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler
} from 'react-native';
import actions from "../actions/index";
import { connect } from "react-redux";
import WindRoseChart from './WindRoseChart';
import services from '../services/index';
import { Header, Button, Card, Divider } from 'react-native-elements';
import Loader from './Loader';
import { Table, Row, Rows } from 'react-native-table-component';

class PointSettings extends Component {
  constructor() {
    super();
    this.state = {
      isDelButton: false,
      tableHead: ['Danger name', 'In danger now', 'In danger for a period(days)'],
    };
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
          this.props.updateStatistic();
        }
      });
  };

  render() {
    let { info, statistic } = this.props;
    let { point, type } = info;
    const { isDelButton } = this.state;
    if (!point) {
      point = {};
    }

    return (
      <View>
        {
          !isDelButton ?
            <ScrollView contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Card containerStyle={{ elevation: 5 }}>
                <View style={{ margin: 10 }}>
                  <Text style={{ textAlign: 'center' }}>Name: {point.name}</Text>
                  <Text style={{ textAlign: 'center' }}>Type: {type}</Text>
                  <Text style={{ textAlign: 'center' }}>Lat: {point.lat}</Text>
                  <Text style={{ textAlign: 'center' }}>Lng: {point.lng}</Text>
                </View>
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
                  this.setState({ isSentButton: true });
                  this.delMarker()
                    .then(() => {
                      this.props.updateReduxState({ info: { point: null, type: null } });
                      this.props.navigation.navigate('Map');
                    });
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
  text: {
    margin: 6,
    textAlign: 'center'
  }
});
