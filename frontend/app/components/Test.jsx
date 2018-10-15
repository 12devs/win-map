import React, { Component } from 'react';
import services from "./../services";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.test = this.test.bind(this);

  }

  componentDidMount() {
    return this.test()
  }

  test() {
    return services.test()
      .then(res => {
        console.log(res);
      })
  }

  render() {

    return (
      <div>
        Test
      </div>
    )
  }
}

export default Test;
