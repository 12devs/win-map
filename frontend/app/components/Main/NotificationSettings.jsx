import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import MultiSelect from './MultiSelect';
import services from "./../../services";

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
    return services.sendSubscriptions({subscriptions: this.props.notificationSettings.toJS()})
  };

  render() {
    return (
      <div>
        <table width="100%">
          <tbody>
          <tr>
            <th>place</th>
            <th>danger</th>
          </tr>
          {this.props.places.map((point, id) =>
            <tr key={id}>
              <td>
                {point.get('name')}
              </td>
              <td>
                <MultiSelect point={point.toJS()}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <button onClick={this.handleClick}>Send</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(NotificationSettings);
