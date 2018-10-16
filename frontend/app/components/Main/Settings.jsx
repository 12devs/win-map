import React from 'react';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions/points';

const data = [{markerType: 'My Place', dataType: 'Current', event: 'Add'}, {
  markerType: 'Danger',
  dataType: 'Historical',
  event: 'Del'
}];

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      markerType: 'My Place',
      dataType: 'Current',
      event: 'Add'
    };

    this.getInfo = this.getInfo.bind(this);
    this.onMarkerChanged = this.onMarkerChanged.bind(this);
    this.onDataTypeChanged = this.onDataTypeChanged.bind(this);
    this.onEventChanged = this.onEventChanged.bind(this);
  }

  componentDidMount() {
    return this.getInfo();
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        console.log(res);
        this.props.setMainData(res);
      });
  }

  onMarkerChanged(e) {
    this.setState({
      markerType: e.currentTarget.value
    });
  }

  onDataTypeChanged(e) {
    this.setState({
      dataType: e.currentTarget.value
    });
  }

  onEventChanged(e) {
    this.setState({
      event: e.currentTarget.value
    });
  }

  render() {
    console.log('Main Props', this.props);
    let resultRows = data.map((result, id) =>
      <tbody key={id}>
      <tr>
        <td><input type="radio" name="markers"
                   value={result.markerType}
                   checked={this.state.markerType === result.markerType}
                   onChange={this.onMarkerChanged}/>{result.markerType}</td>
        <td><input type="radio" name="data_type"
                   value={result.dataType}
                   checked={this.state.dataType === result.dataType}
                   onChange={this.onDataTypeChanged}/>{result.dataType}</td>
        <td><input type="radio" name="event"
                   value={result.event}
                   checked={this.state.event === result.event}
                   onChange={this.onEventChanged}/>{result.event}</td>
      </tr>
      </tbody>, this);

    return (
      <table className="table">
        <thead>
        <tr>
          <th>Marker</th>
          <th>Data</th>
          <th>Event</th>
        </tr>
        </thead>
        {resultRows}
        <tfoot>
        <tr>
          <td>chosen marker: {this.state.markerType} </td>
          <td>chosen data: {this.state.dataType} </td>
          <td>chosen event: {this.state.event} </td>
        </tr>
        </tfoot>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(Settings);
