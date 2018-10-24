import React from 'react';
import {connect} from 'react-redux';
import actions from './../../actions';
import {Dropdown, Icon, Menu} from 'antd';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {id: 0, message: 'zdarova', sent_at: '2018-10-10', checked: false},
        {id: 1, message: 'aaaaa', sent_at: '2018-10-10', checked: false},
        {id: 3, message: 'bbbbbbbb', sent_at: '2018-10-10', checked: false},
        {id: 4, message: 'cccccccc', sent_at: '2018-10-10', checked: false},
        {id: 5, message: 'ddddd ddddddd', sent_at: '2018-10-10', checked: false}
      ],
      visible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.visibleChange = this.visibleChange.bind(this);
  }

  handleClick = (id) => {
    let notifications = this.state.notifications;
    const index = notifications.findIndex(el => el.id === id)
    notifications[index].checked = true;
    this.setState({notifications});
  };

  visibleChange = (e) => {
    console.log(e);
    this.setState({visible: e})
  };

  render() {
    const filter = this.state.notifications.filter(el => el.checked === false);
    const menu = (
      <Menu >
        {filter.map((el) =>
          <Menu.Item key={el.id}>
            <span style={{paddingRight:'25px'}}>{el.message}</span>
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
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(Notifications);
