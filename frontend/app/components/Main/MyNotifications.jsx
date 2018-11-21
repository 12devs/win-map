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
      visible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.visibleChange = this.visibleChange.bind(this);
  }

  handleClick = (id) => {
    console.log('handleClick');
    const notifications = this.props.notifications;
    const index = notifications.findIndex(el => el.id === id);
    notifications[index].view_at = new Date();
    this.props.updateReduxState({notifications});
    this.setState({});
    return services.viewNotifications({notification: notifications[index]});
  };

  visibleChange = (e) => {
    this.setState({visible: e});
  };

  render() {
    console.log('render');
    const filter = this.props.notifications.filter(el => el.view_at === null);
    // const filter = this.props.notifications;
    console.log(filter);
    return (
      <div>
        {filter.map((el) =>
          <div key={el.id} className={'notification__item'}>
            <span className="notification__settings-item notification__settings-item--name">{el.message}</span>
            <a onClick={() => this.handleClick(el.id)} style={{cursor: 'pointer', float: 'right'}}><Icon type="close"/></a>
          </div>
        )}
        <button className="notification__settings-close" onClick={this.props.close}/>
      </div>
    );

    // return (
    //   <Dropdown overlay={menu} onVisibleChange={this.visibleChange} visible={this.state.visible} trigger={['click']}>
    //     <Icon style={{border:'1px solid', width: '2rem !important', height: '2rem !important'}} type="bell"/>
    //   </Dropdown>
    // );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.get('notifications')
  };
}

export default connect(mapStateToProps, actions)(Notifications);
