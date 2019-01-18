import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import actions from "../actions";

const Rules = {
  notLogged: ['ChangePassword', 'Register', 'Login','Map', /*'test'*/],
  logged: ['Map', 'notificationSettings', /*'test'*/, 'notifications', 'Logout'],
};

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
      <View>
        <View style={styles.headerContainer}>
          <Image source={{uri: 'https://s3.amazonaws.com/dsg.files.app.content.prod/gereports/wp-content/uploads/2017/09/12121430/wind-onshore-48-158-3d-landscape-1-3000px.jpg'}}
                 style={{backgroundColor:'#000', width: "100%", height: "100%", opacity: 0.7}}  />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Wind App</Text>
          </View>
        </View>
        <ScrollView>
          <DrawerItems items={filteredItems} {...rest}/>
        </ScrollView>
      </View>
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
    color: '#e3e3e3',
    fontSize: 25
  },
  headerContainer: {
    backgroundColor: '#000',
    height: "40%"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-25%',
    marginRight: '48%'
  },
});

export default connect(mapStateToProps, actions)(CustomDrawerContentComponent);
