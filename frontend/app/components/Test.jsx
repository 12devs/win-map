import React, { Component } from 'react';
import services from "./../services";
import { connect } from 'react-redux';
import actions from './../actions/points';


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.test = this.test.bind(this);

  }

  componentDidMount() {
    console.log('test', 'componentDidMount');
    return this.test()
  }

  test() {
    const point = {
      name: 'point_1',
      type: 'danger',
      lat: -34.35897,
      lng: 150.35897,
    };
    return services.getInfo(point)
      .then(res => {
        this.props.addPoint(res.point)
      })
  }

  render() {
    console.log('this.props', this.props);
    console.log('this.props.test', this.props.points);
    return (
      <div>
        <h1>Test</h1>
        <h1>{JSON.stringify(this.props.points)}</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    points: state.get("points"),
  };
}

export default connect(mapStateToProps, actions)(Test);
