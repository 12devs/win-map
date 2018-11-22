import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import MultiSelect from './MultiSelect';
import services from "./../../services";
import {
  unSubscribeToNotifications,
  subscribeToNotifications,
  isPushNotificationsEnabled
} from "../../services/push-notification";
import Switch from "react-switch";

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeDeviceSettings = this.changeDeviceSettings.bind(this);
  }

  componentDidMount() {
    return isPushNotificationsEnabled()
      .then(checked => {
        this.setState({ checked });
      })
  }

  handleClick = () => {
    this.props.close();
    return services.sendSubscriptions({ subscriptions: this.props.notificationSettings });
  };

  changeDeviceSettings = (e) => {
    this.setState({ checked: e });
    console.log(e);
    if (e) {
      console.log('ask');
      return subscribeToNotifications()
    } else {
      console.log('delete');
      return unSubscribeToNotifications()
    }
  };

  render() {

    if (!this.props.open) {
      return null;
    }

    return (
      <div className="notification__block">
        <button className="notification__settings-close" onClick={this.props.close}/>
        <div className={'notification__settings'}>
          {this.props.places.length ?
            (this.props.places.map((point, id) => {
                return (
                  <div key={id} className={'notification__item'}>
                    <div className={'notification__settings-item'}>Place: {point.name}</div>
                    <div className={'notification__settings-item'}><MultiSelect point={point}/></div>
                  </div>
                  )})):(
          <div className={'notification__item'}>
            <div className={'notification__settings-item'}>There are not places</div>
          </div>)}
        </div>

        <div className="notification__settings-item notification__settings-item--title">
          <span>Send notification to this device </span>
          <Switch
            onChange={this.changeDeviceSettings}
            checked={this.state.checked}
          />
          <button className="notification__btn notification__btn--save" onClick={this.handleClick}>Save</button>
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
