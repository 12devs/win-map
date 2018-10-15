import React, { Component } from 'react';
import Preloader from './Preloader';

class Cheker extends Component {
  constructor(props) {
    super(props);
    this.state = {    };
  }

  componentDidMount() {
    if (localStorage.breathCode){
      location.assign(`/city/${localStorage.breathCode}`)
    } else {
      location.assign(`/main`)
    }
  }

  render() {
    return (
      <Preloader/>
    )
  }
}

export default Cheker;
