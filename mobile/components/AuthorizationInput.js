import React, { Component } from 'react'
import { View, TextInput, StyleSheet, } from 'react-native'
import { Icon } from 'react-native-elements'

class AuthorizationInput extends Component {

  render() {
    const { value, placeholder, onChangeText, icon, secureTextEntry, isPassword, pressEye } = this.props

    return (

      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={icon} color='#3D6DCC'/>
        </View>
        <TextInput
          style={isPassword ? styles.inputPassword : styles.input}
          value={value}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#3D6DCC"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          onChangeText={onChangeText}
        />
        {isPassword && <View style={styles.iconContainerPassword}>
          <View style={styles.container}>
            <Icon
              onPress={pressEye}
              name={!secureTextEntry ? 'eye-off' : 'eye'}
              type='material-community'
              color='gray'
            />
          </View>
        </View>}
      </View>

    )

  }
}

export default AuthorizationInput

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputPassword: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "65%",
  },
  input: {
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: "80%",
  },
  iconContainerPassword: {
    borderBottomColor: '#3D6DCC',
    borderBottomWidth: 1,
    width: '15%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
})
