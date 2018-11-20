import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import actions from '../actions/index';
import services from '../services/index';
import { connect } from "react-redux";
import { Button, List, ListItem } from 'react-native-elements';
import service from '../services';

const { width, height } = Dimensions.get('window');

class Notifications extends Component {

  handleClick(id) {
    const notifications = this.props.notifications;
    const index = notifications.findIndex(el => el.id === id);
    notifications[index].view_at = new Date();
    this.props.updateReduxState({ notifications });
    services.viewNotifications({ notification: notifications[index] });
    this.forceUpdate();
  };

  viewAllNotification() {
    const notifications = this.props.notifications;
    return service.viewAllNotification().then(res => {
      notifications.map(el => el.view_at = new Date());
      this.props.updateReduxState({ notifications });
      console.log(res);
      this.forceUpdate();
    });
  };

  render() {
    const unviewedNotifications = this.props.notifications.filter(elem => !elem.view_at);

    if (!unviewedNotifications.length) {
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
      </View>;
    }
    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            unviewedNotifications.map((notification, i) => (
              <ListItem
                key={i}
                title={notification.message}
                subtitle={notification.created_at}
                leftIcon={{ name: 'notifications' }}
                rightIcon={{ name: 'close' }}
                containerStyle={{ borderBottomColor: '#eee', borderTopColor: '#eee', marginLeft: 10, marginRight: 10 }}
                onPressRightIcon={() => {
                  this.handleClick(notification.id);
                }}
              />
            ))
          }
        </List>
        <Button
          containerViewStyle={{ marginLeft: width / 5, marginRight: width / 5, marginBottom: 20 }}
          backgroundColor={'#3D6DCC'}
          borderRadius={50}
          color={'#fff'}
          title='Clear All'
          onPress={() => {
            this.viewAllNotification();
          }}/>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.get('notifications'),
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
  },
  map: {},
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 5,
    height: 40,
  },
});
