import React from 'react';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions';
import Map from './Map';
import Notifications from './Notifications';
import PointSettings from './PointSettings';
import SavePointSettings from './SavePointSettings';
import { calcBoundsAll } from "./../../utils";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Popover } from 'antd';
import 'antd/lib/popover/style/index.css';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      isNotificationSettingsOpen: false,
    };
    this.getInfo = this.getInfo.bind(this);
    this.openNotificationSettings = this.openNotificationSettings.bind(this);
    this.closeNotificationSettings = this.closeNotificationSettings.bind(this);
    this.changeViewType = this.changeViewType.bind(this);
    this.logout = this.logout.bind(this);
    this.showAll = this.showAll.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidMount() {
    return this.getInfo();
  }

  openNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: true });
  }

  changeViewType() {
    if (this.props.viewType === 'Current') {
      this.props.updateReduxState({ viewType: 'Historical' });
    } else {
      this.props.updateReduxState({ viewType: 'Current' });
    }
  }

  closeNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: false });
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        res.savePointSettings = {};
        res.mapBounds = calcBoundsAll([...res.places, ...res.dangers]);
        this.props.updateReduxState(res);
        this.props.updateStatistic();
      });
  }

  showAll() {
    try {
      const places = this.props.places;
      const dangers = this.props.dangers;
      const mapBounds = calcBoundsAll([...places, ...dangers]);
      this.props.updateReduxState({ mapBounds });
      this.closeNotificationSettings();
    } catch (err) {
      console.log(err);
    }
  }

  logout = () => {
    confirmAlert({
      customUI: par => {
        const { onClose } = par;
        return (
          <div className={'confirm__alert'}>
            <div style={{ margin: '50px' }}>
              <h1>Are you sure?</h1>
              <p>You want to logout?</p>
              <button className={"confirm__button"} onClick={() => {
                localStorage.setItem('windToken', '');
                location.assign('/login');
                onClose();
              }}>Yes
              </button>
              <button className={"confirm__button"} onClick={onClose}>No</button>
            </div>
          </div>
        );
      },
    });
  };

  deleteAll = () => {
    confirmAlert({
      customUI: par => {
        const { onClose } = par;
        return (
          <div className={'confirm__alert'}>
            <div style={{ margin: '50px' }}>
              <h1>Are you sure?</h1>
              <p>You want to delete all your points?</p>
              <button className={"confirm__button"} onClick={() => {
                return services.deleteAllPoints()
                  .then(() => {
                    this.props.updateReduxState({ places: [], dangers: [] });
                    this.props.updateStatistic();
                    onClose();
                  })
                  .catch(() => {
                    onClose();
                  });
              }}>Yes
              </button>
              <button className={"confirm__button"} onClick={onClose}>No</button>
            </div>
          </div>
        );
      },
    });
  };

  render() {
    return (
      <div>
        <div className="map__navigation">
          <Popover content={'View all markers'} mouseLeaveDelay={0.1} mouseEnterDelay={0.3}>
            <button className="map__navigation-btn map__navigation-btn--show-all" onClick={this.showAll}/>
          </Popover>
          <Popover content={'Remove all markers'} mouseLeaveDelay={0.1} mouseEnterDelay={0.3}>
            <button className="map__navigation-btn map__navigation-btn--delete-all" onClick={this.deleteAll}/>
          </Popover>
          <Popover content={'Notifications'} mouseLeaveDelay={0.1} mouseEnterDelay={0.3}>
            <button className="map__navigation-btn map__navigation-btn--notifications"
                    onClick={this.openNotificationSettings}/>
          </Popover>
          <Popover content={'Current/History'} mouseLeaveDelay={0.1} mouseEnterDelay={0.3}>
            <button className="map__navigation-btn map__navigation-btn--mode" onClick={this.changeViewType}/>
          </Popover>
          <Popover content={'Logout'} mouseLeaveDelay={0.1} mouseEnterDelay={0.3}>
            <button className="map__navigation-btn map__navigation-btn--logout" onClick={this.logout}/>
          </Popover>
          <input className="map__navigation-range" type="range" id="start" name="size"
                 min="0" max="100" onChange={(e) => this.props.updateReduxState({ scaleWind: e.target.value })}/>
        </div>
        <Notifications open={this.state.isNotificationSettingsOpen} close={this.closeNotificationSettings}/>
        <PointSettings open={this.state.isNotificationSettingsOpen} close={this.closeNotificationSettings}/>
        <SavePointSettings/>
        <Map/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    viewType: state.get('viewType'),
  };
}

export default connect(mapStateToProps, actions)(Main);
