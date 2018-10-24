import React from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import {Dropdown, Icon, Menu} from 'antd';
import moment from 'moment';
import services from '../../services';

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
  };

  visibleChange = (e) => {
    console.log(e);
    this.setState({visible: e});
    console.log('visibleChange', this.props.notifications.toJS());
    if (this.state.visible) {
      console.log('da');
      return services.viewNotifications({notifications: this.props.notifications.toJS()})
        .then(res => {
          console.log(res);
        });
    }

  };

  render() {
    const filter = this.props.notifications.toJS().filter(el => el.view_at === null);
    console.log(filter);
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
        <Icon type="bell"/>
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