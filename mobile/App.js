import React from 'react';
import Login from './Login.js'
import Register from './Register.js'
import Main from './Main.js'
import Test from './Test.js'
import { Router, Scene } from 'react-native-router-flux'

const App = () => {
  return (
    <Router>
      <Scene key = "root">
        <Scene key = "Login" component = {Login} title = "Login" />
        <Scene key = "Register" component = {Register} title = "Register" />
        <Scene key = "Main" component = {Main} title = "Main" />
        <Scene key = "Test" component = {Test} title = "Test" initial = {true}/>
      </Scene>
    </Router>
  )
}
export default App
