import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import actions from '../actions/index';
import services from '../services/index';
import { connect } from "react-redux";
import MultiSelect from './MultiSelect';

class notificationSettings extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {this.props.places.map((place, i) => {
          return (
            <View key={i} style={styles.container}>
              <View style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: 'steelblue',
                borderRadius: 20,
              }}>
                <Text style={{
                  textAlign: 'center',
                  borderWidth: 2,
                  borderColor: 'silver',
                  borderRadius: 20,
                  textAlignVertical: "center",
                  color: 'silver',
                  padding: 10,
                }}>
                  {place.name}
                </Text>
              </View>
              <MultiSelect style={{ width: '80%' }} place={place}/>
            </View>);
        })}
        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {
            () => services.sendSubscriptions({subscriptions: this.props.notificationSettings})
              .then(res=>{
                console.log(res)
              })
          }>
          <Text style = {styles.submitButtonText}> Save </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(notificationSettings);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'steelblue',
    borderWidth: 2,
    borderColor: 'steelblue',
    borderRadius: 20,
    // alignItems: 'center',
  },
  map: {},
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
  },
});
