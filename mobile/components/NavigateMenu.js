import React, { Component } from 'react'
import { AsyncStorage, ScrollView, View, Text, StyleSheet, Image } from "react-native"
import { DrawerItems } from "react-navigation"
import { connect } from "react-redux"
import actions from "../actions"

const Rules = {
  notLogged: ['ChangePassword', 'Register', 'Login', 'Map', 'About' /*'test'*/],
  logged: ['Map', 'notificationSettings', /*'test'*/, 'notifications', 'Logout', 'About'],
}

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
    const { items, ...rest } = this.props
    const filteredItems = items.filter(item => Rules[this.props.menuRule || 'notLogged'].indexOf(item.key) !== -1)

    return (
      <View style={styles.container}>
        {/*<View style={styles.headerContainer}>*/}
        <Image source={require('../assets/screen.png')}
               style={styles.image}/>
        {/*<View style={styles.textContainer}>*/}
        {/*<Text style={styles.text}>Wind App</Text>*/}
        {/*</View>*/}
        {/*</View>*/}
        <ScrollView>
          <DrawerItems items={filteredItems} {...rest}/>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    menuRule: state.get('menuRule'),
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#e3e3e3',
    fontSize: 25
  },
  headerContainer: {
    backgroundColor: '#000',
    height: "50%"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-25%',
    marginRight: '48%'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    backgroundColor: '#000',
    width: '100%',
    height: '40%',
    opacity: 0.9,
    alignSelf: 'center'
  }
})

export default connect(mapStateToProps, actions)(CustomDrawerContentComponent)
