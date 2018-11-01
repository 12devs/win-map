import React from 'react';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions';
import Map from './Map'
import NotificationSettings from './NotificationSettings';
import PointSettings from './PointSettings';
import SavePointSettings from './SavePointSettings';
import Notifications from './Notifications';
import geolib from "geolib";

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
    this.calcBounds = this.calcBounds.bind(this);
    this.showAll = this.showAll.bind(this);
  }

  componentDidMount() {
    return this.getInfo()
  }

  openNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: true })
  }

  changeViewType() {
    if (this.props.viewType === 'Current') {
      this.props.updateReduxState({viewType:'Historical'})
    } else {
      this.props.updateReduxState({viewType:'Current'})
    }
  }

  closeNotificationSettings() {
    this.setState({ isNotificationSettingsOpen: false })
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        res.savePointSettings = {};
        res.mapBounds = this.calcBounds([...res.places, ...res.dangers]);
        this.props.updateReduxState(res);
        this.props.updateStatistic();
      })
  }

  calcBounds(points) {
    try {
      const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
      if (minLat && maxLat && minLng && maxLng) {
        return [[minLat + Math.random()/1000000, minLng], [maxLat, maxLng]];
      } else {
        throw new Error('cannot get bounds')
      }
    } catch (err) {
      return [[50.505, -29.09], [52.505, 29.09]]
    }
  }

  showAll() {
    try {
      const places = this.props.places;
      const dangers = this.props.dangers;
      const mapBounds = this.calcBounds([...places, ...dangers]);
      this.props.updateReduxState({mapBounds});
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
          <button className="map__navigation-btn map__navigation-btn--settings" onClick={this.openNotificationSettings}/>
          <button className="map__navigation-btn map__navigation-btn--mode" onClick={this.changeViewType}/>
          <button className="map__navigation-btn map__navigation-btn--logout" onClick={this.logout}/>
          <input className="map__navigation-range" type="range" id="start" name="size"
               min="0" max="1000000" onChange={(e) => this.props.updateReduxState({scaleWind: e.target.value})}/>
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
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
  };
}

export default connect(mapStateToProps, actions)(Main);
