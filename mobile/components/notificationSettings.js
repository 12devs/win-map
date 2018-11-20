import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import actions from '../actions/index';
import services from '../services/index';
import { connect } from "react-redux";
import MultiSelect from './MultiSelect';
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class notificationSettings extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <View style={styles.container}>
          <Text style={styles.textContainer}>
            Select the dangers for each blue marker that notify you
          </Text>
        </View>
        {this.props.places.map((place, i) => {
          return (
            <View key={i} style={styles.container}>
              <Text style={styles.textContainer}>
                {place.name}
              </Text>
              <MultiSelect style={{ width: '80%' }} place={place}/>
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
              })
          }/>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#3c5fbd',
    elevation: 7,
    borderColor: 'steelblue',
  },
  textContainer:{
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#fff',
    padding: 10,
  }
});
