import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Image, Text, Dimensions, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";

const Rules = {
  notLogged: ['ChangePassword', 'Register', 'Login', /*'test'*/],
  logged: ['Map', 'notificationSettings', /*'test', */'notifications', 'Logout'],
};

const { width, height } = Dimensions.get('window');


class CustomDrawerContentComponent extends Component {

  componentDidMount() {
    return AsyncStorage.getItem('windToken')
      .then(windToken => {
        if (windToken) {
          this.props.updateReduxState({ menuRule: 'logged' });
        } else {
          this.props.updateReduxState({ menuRule: 'notLogged' });
        }
      });
  }

  render() {
    const { items, ...rest } = this.props;
    const filteredItems = items.filter(item => Rules[this.props.menuRule || 'notLogged'].indexOf(item.key) !== -1);

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Wind App</Text>
          </View>
        </View>
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

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25
  },
  headerContainer: {
    backgroundColor: '#3D6DCC',
    height: height / 4.5
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default connect(mapStateToProps, actions)(CustomDrawerContentComponent);
