import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions/points';

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
        console.log(res);
        this.props.setMainData(res)
      })
  }

  render() {
    console.log('Main Props', this.props);
    return (
      <div>
        <h1>Main</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    points: state.get("points"),
    stations: state.get("stations"),
    stationsData: state.get("stationsData"),
  };
}

export default connect(mapStateToProps, actions)(Main);
