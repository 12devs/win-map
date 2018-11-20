import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import MultiSelect from './MultiSelect';
import services from "./../../services";
import { askForPermissioToReceiveNotifications, deleteToken } from "../../services/push-notification";
import Switch from "react-switch";

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleClick = this.handleClick.bind(this);
    this.changeDeviceSettings = this.changeDeviceSettings.bind(this);
  }

  handleClick = () => {
    this.props.close();
    return services.sendSubscriptions({ subscriptions: this.props.notificationSettings });
  };

  changeDeviceSettings = (e) => {
    if (e.target.checked){
      console.log('ask');
      return askForPermissioToReceiveNotifications(e)
    } else {
      console.log('delete');
      return deleteToken(e)
    }
  };

  render() {

    if (!this.props.open) {
      return null;
    }

    return (
      <div>
        <div className='point__container' onClick={this.props.close}>
        </div>
        <div className="notification">
          <table className="notification__settings" width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
            <tr>
              <th className="notification__settings-item notification__settings-item--title">Place</th>
              <th className="notification__settings-item notification__settings-item--title">Danger</th>
            </tr>
            {this.props.places.map((point, id) =>
              <tr key={id}>
                <td className="notification__settings-item notification__settings-item--name">
                  {point.name}
                </td>
                <td className="notification__settings-item notification__settings-item--name">
                  <MultiSelect point={point}/>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <div className="notification__settings-item notification__settings-item--title">
            <span>Send notification to this device </span>
            <Switch
              onChange={(e)=>this.setState({checked: e})}
              checked={this.state.checked}
            />
          </div>
          <button className="notification__btn notification__btn--save" onClick={this.handleClick}>Send</button>
          <button className="notification__settings-close" onClick={this.props.close}/>
        </div>
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
