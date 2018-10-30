import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import MultiSelect from './MultiSelect';
import services from "./../../services";
import { askForPermissioToReceiveNotifications, deleteToken } from "../../services/push-notification";

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.close();
    return services.sendSubscriptions({ subscriptions: this.props.notificationSettings })
  };

  render() {

    if (!this.props.open){
      return null
    }

    return (
      <div style={{ position: "absolute", left: "100px", top: "300px", zIndex: 1000, padding: '50px', backgroundColor: 'white', margin: "auto", width: "60%" }}>
        <button onClick={askForPermissioToReceiveNotifications}>
          Subscribe to notifications
        </button>
        <button onClick={deleteToken}>
          unsubscribe to notifications
        </button>
        <table width="100%">
          <tbody>
          <tr>
            <th>place</th>
            <th>danger</th>
          </tr>
          {this.props.places.map((point, id) =>
            <tr key={id}>
              <td>
                {point.name}
              </td>
              <td>
                <MultiSelect point={point}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <button onClick={this.handleClick}>Send</button>
        <button onClick={this.props.close}>Close</button>
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
