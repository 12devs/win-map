import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import MultiSelect from './MultiSelect';
import services from "./../../services";
import { askForPermissioToReceiveNotifications, deleteToken } from "../../services/push-notification";
import Switch from "react-switch";
import MyNotifications from "./MyNotifications";
import NotificationSettings from "./NotificationSettings";

const COMPONENTS = {
  MyNotifications,
  NotificationSettings
}


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: 'MyNotifications'
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
  }

  handleClick = () => {
    this.props.close();
    return services.sendSubscriptions({ subscriptions: this.props.notificationSettings });
  };

  changeComponent = (e) => {
    let { component } = this.state;
    if (component === 'MyNotifications') {
      component = 'NotificationSettings';
      this.setState({ component })
      return
    }
    if (component === 'NotificationSettings') {
      component = 'MyNotifications';
      this.setState({ component });
      return
    }
  };

  render() {

    if (!this.props.open) {
      return null;
    }
    console.log(this.state.component);
    const Component = COMPONENTS[this.state.component];

    return (
      <div>
        <div className='point__container' onClick={this.props.close}>
        </div>
        <div className="notification">
          <button className="map__navigation-btn map__navigation-btn--settings" onClick={this.changeComponent}/>
          <Component open={this.props.open} close={this.props.close}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    notificationSettings: state.get('notificationSettings'),
    notifications: state.get('notifications'),
  };
}

export default connect(mapStateToProps, actions)(Notifications);
