import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import actions from './actions';
import services from './services';
import { connect } from "react-redux";
import MultiSelect from './MultiSelect';

class Notifications extends Component {

  handleClick(id) {
    const notifications = this.props.notifications;
    const index = notifications.findIndex(el => el.id === id);
    notifications[index].view_at = new Date();
    this.props.updateReduxState({ notifications });
    services.viewNotifications({ notification: notifications[index] });
    this.forceUpdate();
  };

  render() {
    const unviewedNotifications = this.props.notifications.filter(elem => !elem.view_at);
    if (!unviewedNotifications.length){
      return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
          {'No notifications'}
        </Text>
      </View>
    }
    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {unviewedNotifications.map((notification, i) => {
          return (
            <View key={i} style={styles.container}>
              <View style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
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
                  {notification.message}
                </Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    this.handleClick(notification.id)
                  }}>
                  <Text style={styles.submitButtonText}> OK </Text>
                </TouchableOpacity>
              </View>
            </View>);
        })}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    notifications: state.get('notifications'),
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(Notifications);


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
