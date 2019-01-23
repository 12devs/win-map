import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, BackHandler, Platform } from 'react-native'
import { Button } from 'react-native-elements'

class About extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map')
    return true
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Image source={require('../assets/wind_app432.png')}
                 style={styles.image}/>

          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>
              Version: 1.0
            </Text>
            <Text style={{ textAlign: 'center' }}>
              All rights reserved
            </Text>
            <Text style={{ textAlign: 'center' }}>
              2019
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                containerViewStyle={styles.button}
                backgroundColor={'#3D6DCC'}
                borderRadius={50}
                title='Contact us'
                onPress={() => {
                }}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                containerViewStyle={styles.button}
                backgroundColor={'#3D6DCC'}
                borderRadius={50}
                title={Platform.OS === 'ios' ? 'Rate on App Store' : 'Rate on Google play'}
                onPress={() => {
                }}/>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default About

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 10,
    width: "80%",
  }
})
