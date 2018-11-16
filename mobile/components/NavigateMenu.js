import React, { Component } from 'react';
import { AsyncStorage, ScrollView } from "react-native";
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";

const Rules = {
  notLogged: ['Register', 'Login', 'test'],
  logged: ['Register', 'Login', 'Map', 'notificationSettings', 'test', 'notifications', 'Logout'],
};

class CustomDrawerContentComponent extends Component {

  componentDidMount() {
    return AsyncStorage.getItem('windToken')
      .then(windToken => {
        if (windToken) {
          this.props.updateReduxState({ menuRule: 'logged' })
        } else {
          this.props.updateReduxState({ menuRule: 'notLogged' })
        }
      })
  }

  render() {
    const { items, ...rest } = this.props;
    const filteredItems = items.filter(item => Rules[this.props.menuRule || 'notLogged'].indexOf(item.key) !== -1);

    return (
      <ScrollView>
        <DrawerItems items={filteredItems} {...rest}/>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    menuRule: state.get('menuRule'),
  };
}

export default connect(mapStateToProps, actions)(CustomDrawerContentComponent);
