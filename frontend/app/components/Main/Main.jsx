import React from 'react';
import services from "./../../services";
import { connect } from 'react-redux';
import actions from './../../actions';
import Map from './Map'
import Settings from './Settings'

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
        this.props.setMainData(res);
        console.log('Mai', JSON.parse(JSON.stringify(this.props)));

      })
  }

  render() {
    return (
      <div>
        <h1>Main</h1>
        <Map/>
        <Settings/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    points: state.get("points"),
    stations: state.get("stations"),
    stationsData: state.get("stationsData"),
    markerType: state.get("markerType"),
    viewType: state.get("viewType"),
    actionType: state.get("actionType"),
    statistic: state.get("statistic"),
  };
}

export default connect(mapStateToProps, actions)(Main);
