import React from 'react';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import Danger from './Danger';
import UserPlace from './UserPlace';

class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      point: null,
      type: null,
    };
    this.showInfo = this.showInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  closeInfo() {
    this.setState({ point: null, type: null })
  }

  showInfo(point, type) {
    this.setState({ point, type })
  }

  render() {
    return (
      <div>
        {this.props.places.map((point, id) => {
          return <UserPlace key={id} point={point} showInfo={this.showInfo}/>;
        })}
        {this.props.dangers.map((point, id) => {
          return <Danger key={id} point={point} showInfo={this.showInfo}/>;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    savePointSettings: state.get('savePointSettings'),
  };
}

export default connect(mapStateToProps, actions)(Markers);
