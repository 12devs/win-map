import React, { Component } from 'react';
import Footer from "../footer";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={"l-hero__scroll"}>
        <div className="l-hero-charts">
          <div className="l-hero-charts__city">
            <div className="l-hero-charts__city-subtitle">Error</div>
            <div className="l-hero-charts__city-title">{this.props.text}</div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Error;
