import React from 'react';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions';
import Map from './Map'
import Settings from './Settings'
import NotificationSettings from './NotificationSettings';

class Main extends React.Component {
  constructor() {
    super();
    this.getInfo = this.getInfo.bind(this);
  }

  componentDidMount() {
    return this.getInfo()
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        this.props.setMainData(res);
        this.props.updateStatistic();
      })
  }

  render() {
    return (
      <div>
        <h1>Main</h1>
        <Map/>
        <Settings/>
        <NotificationSettings/>
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
  };
}

export default connect(mapStateToProps, actions)(Main);
