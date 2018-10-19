import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import DoubleSelect from './DoubleSelect';

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (newValue) => {
    console.log('newValue', newValue);
  };

  handleClick = () => {
    let points = this.props.notificationSettings.toJS();
    points.push({arrId: this.props.notificationSettings.toJS().length});
    this.props.updateNotificationSettings(points);
  };

  render() {
    return (
      <div>
        {this.props.notificationSettings.map((point, id) =>
          <div key={id}>
            <DoubleSelect point={point.toJS()}/>
            <br/>
            <br/>
          </div>
        )}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(NotificationSettings);
