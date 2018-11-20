import React from 'react';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions';
import Map from './Map'
import NotificationSettings from './NotificationSettings';
import PointSettings from './PointSettings';
import SavePointSettings from './SavePointSettings';
import Notifications from './Notifications';
import { calcBoundsAll } from "./../../utils";

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
    return this.getInfo()
  }

  openNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: true })
  }

  deleteAll() {
    return services.deleteAllPoints()
      .then(() => {
        this.props.updateReduxState({places:[], dangers:[]});
        this.props.updateStatistic();
      })
  }

  changeViewType() {
    if (this.props.viewType === 'Current') {
      this.props.updateReduxState({ viewType: 'Historical' })
    } else {
      this.props.updateReduxState({ viewType: 'Current' })
    }
  }

  closeNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: false })
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        res.savePointSettings = {};
        res.mapBounds = calcBoundsAll([...res.places, ...res.dangers]);
        this.props.updateReduxState(res);
        this.props.updateStatistic();
      })
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

  logout() {
    return localStorage.setItem('windToken', '')
  }

  render() {
    return (
      <div>
        <div className="map__navigation">
          <button className="map__navigation-btn map__navigation-btn--show-all" onClick={this.showAll}/>
          <button className="map__navigation-btn map__navigation-btn--show-all" onClick={this.deleteAll}/>
          <button className="map__navigation-btn map__navigation-btn--settings"
                  onClick={this.openNotificationSettings}/>
          <button className="map__navigation-btn map__navigation-btn--mode" onClick={this.changeViewType}/>
          <button className="map__navigation-btn map__navigation-btn--logout" onClick={this.logout}/>
          <input className="map__navigation-range" type="range" id="start" name="size"
                 min="0" max="1000000" onChange={(e) => this.props.updateReduxState({ scaleWind: e.target.value })}/>
        </div>
        <NotificationSettings open={this.state.isNotificationSettingsOpen} close={this.closeNotificationSettings}/>
        <PointSettings open={this.state.isNotificationSettingsOpen} close={this.closeNotificationSettings}/>
        <SavePointSettings/>
        <Notifications/>
        <Map/>
      </div>
    )
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
