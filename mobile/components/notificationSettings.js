import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import actions from '../actions/index';
import services from '../services/index';
import { connect } from "react-redux";
import MultiSelect from './MultiSelect';
import { Button, Card, ListItem } from 'react-native-elements';
import Accordion from './Accordion';

const { width, height } = Dimensions.get('window');

class notificationSettings extends Component {
  constructor() {
    super();
    this.state = {
      touch: ''
    };
    this.onClickPlace = this.onClickPlace.bind(this);
  }

  onClickPlace(id) {
    const { touch } = this.state;

    return this.setState({ touch: touch === id ? '' : id });
  }

  render() {
    console.log(this.state.touch);
    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }}>
        <Card containerStyle={styles.container}>
          <Text style={styles.textContainer}>
            Select the dangers for each blue marker to get notifications on them.
          </Text>
        </Card>
        {this.props.places.map((place, i) => {
          return (
            <View key={i}>
              <ListItem
                onPress={() => this.onClickPlace(place.id)}
                containerStyle={{
                  borderBottomColor: '#eee',
                  // marginTop: 5,
                  // marginBottom: 2,
                  // borderTopColor: 'transparent',
                  // marginLeft: 10,
                  // marginRight: 10
                }}
                title={place.name}
                leftIcon={{ name: 'location-on', color: '#3D6DCC' }}
                rightIcon={place.id === this.state.touch ? { name: 'expand-more' } : {}}/>


              <Accordion place={place} touch={this.state.touch}/>
            </View>);
        })}
        <Button
          containerViewStyle={{ marginLeft: width / 5, marginRight: width / 5, marginBottom: 20, marginTop: 15 }}
          backgroundColor={'#3D6DCC'}
          borderRadius={50}
          color={'#fff'}
          title='Save'
          onPress={
            () => services.sendSubscriptions({ subscriptions: this.props.notificationSettings })
              .then(res => {
                console.log(res);
                Alert.alert(
                  'Alert',
                  'Settings have been saved!',
                  [
                    { text: 'Ok', onPress: () => console.log('No Pressed'), style: 'cancel' },
                  ],
                  { cancelable: false }
                );
              })
          }/>
        <Text>{JSON.stringify(this.props.notificationSettings, null, 4)}</Text>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    places: state.get('places'),
  };
}

export default connect(mapStateToProps, actions)(notificationSettings);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    elevation: 3
  },
  textContainer: {
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#525966',
    padding: 10,
  }
});
