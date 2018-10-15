import React, { Component } from 'react';
import City from './City';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //
  // }

  render() {
    let { cities } = this.props;
    if (!cities) {
      cities = [];
    }
    return (
      <div className="l-section">
        <div className="l-container">
          <div className="l-air">
            <div className="l-air__subtitle">Air quality across</div>
            <div className="l-air__title">United States</div>
            <div className="l-air__card">
              {cities.length > 0 ? (cities.map((item, id) =>
                  <City key={id} src={item} getCity={this.props.getCity} changeState={this.props.changeState}/>
                ))
                :
                <h2>There are no cities</h2>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cities;
