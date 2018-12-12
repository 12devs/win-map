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
    if (this.props.point.station_id) {
      this.newChart(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart() {
    try {
      const data = this.props.stationsData[this.props.point.station_id].windRoseData;
      console.log(data);
      data.exporting.buttons.contextButton.theme = {
        fill: '#F8C845',
        // stroke: '#F8C845',
      };
      data.exporting.buttons.contextButton.symbolFill = 'black';
      data.exporting.buttons.contextButton.symbolStroke = 'black';
      data.exporting.buttons.contextButton.verticalAlign = 'top';

      data.series[0].color = '#ffecb3';
      data.series[1].color = '#ffe082';
      data.series[2].color = '#ffd54f';
      data.series[3].color = '#ffca28';
      data.series[4].color = '#ffc107';
      data.series[5].color = '#ffb300';
      data.series[6].color = '#ffa000';
      data.series[7].color = '#ff8f00';
      data.series[8].color = '#ff6f00';

      data.credits.position = {
        x: 0,
        y: 0,
      };

      data.xAxis.labels = {
        style: {
          color: '#000000a6'
        }
      };
      data.legend.itemStyle = {
        color: '#000000a6',
      };
      new Highcharts.Chart('container', data);
    } catch (err) {
      console.log(err)
    }
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

