import React from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import {Dropdown, Icon, Menu} from 'antd';
import services from '../../services';
import { redIcon } from '../icons';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.visibleChange = this.visibleChange.bind(this);
  }

  handleClick = (id) => {
    const notifications = this.props.notifications.toJS();
    const index = notifications.findIndex(el => el.id === id);
    notifications[index].view_at = new Date();
    this.props.changeNotifications(notifications);
    return services.viewNotifications({notification: notifications[index]})
  };

  visibleChange = (e) => {
    this.setState({visible: e});
  };

  render() {
    const filter = this.props.notifications.toJS().filter(el => el.view_at === null);
    const menu = (
      <Menu>
        {filter.map((el) =>
          <Menu.Item key={el.id}>
            <span style={{paddingRight: '25px'}}>{el.message}</span>
            <a onClick={() => this.handleClick(el.id)} style={{cursor: 'pointer', float: 'right'}}><Icon type="close"/></a>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} onVisibleChange={this.visibleChange} visible={this.state.visible} trigger={['click']}>
        <Icon style={{border:'1px solid', width: '2rem !important', height: '2rem !important'}} type="bell"/>
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.get('notifications')
  };
}

export default connect(mapStateToProps, actions)(Notifications);
