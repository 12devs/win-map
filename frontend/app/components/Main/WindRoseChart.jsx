import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';
import connect from 'react-redux/es/connect/connect';
import actions from '../../actions';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

class WindRoseChart extends React.Component {
  constructor(props) {
    super(props);
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.stationId) {
      this.newChart(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart() {
    new Highcharts.Chart('container', this.props.stationsData[this.props.stationId].windRoseData);
  }

  render() {
    return (
      <div>
        <div id="container"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(WindRoseChart);

