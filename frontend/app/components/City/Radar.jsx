import React, { Component } from 'react';
import figure from './../../assets/img/figure.svg';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

export default class Radar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.src) {
      this.newChart(this.props);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart(props) {
    let { src } = props;
    let data = [];
    let count = 0;
    let currentWind = [];
    const categories = ['North', 'NNE', 'NE', 'ENE', 'East', 'ESE', 'SE', 'SSE',
      'South', 'SSW', 'SW', 'WSW', 'West', 'WNW', 'NW', 'NNW'];
    let arr = Object.values(src.history);
    console.log(arr);
    const max = Math.max(...arr);

    for (let i = 0; i < 16; i++) {
      currentWind[i] = 0;
    }

    for (let key in src.history) {
      data[count] = [key, src.history[key]];
      count++;
    }

    let currentValue = 0;
    const maxValue = max;

    if(src.current.speed){
      currentValue = maxValue;
    }
    currentWind[categories.indexOf(src.current.dir)] = [src.current.dir, currentValue];

    new Highcharts.Chart({
      chart: {
        renderTo: 'container',
        polar: true
      },
      title: {
        text: null
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        size: '77%'
      },
      xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
          formatter: function () {
            return categories[this.value / 22.5];
          }
        }
      },
      tooltip: {
        enabled: false
      },
      yAxis: {
        maxPadding: 0.1,
        // softMax: maxValue * 0.5,
        // softMin: maxValue,
        // tickInterval: 10,
        min: 0,
        max: maxValue * 0.8,
        labels: {
          formatter: function () {
            return this.value + '%';
          }
        }
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 22.5,
          pointPlacement: 'on'
        },
        column: {
          pointPadding: 0,
          groupPadding: 0
        }
      },
      series: [
        {
          name: `Last ${src.period} days`,
          data,
          type: 'column',
          color: '#4BC7C9',
        },
        {
          name: `Current (${src.current.speed} km/h)`,
          data: currentWind,
          type: 'area',
          color: '#5899C9',
          lineWidth: 3
        }],
    });
  }

  render() {
    return (
      <div className="l-charts__container">
        <div className="l-charts__title">Wind Rose</div>
        <img className="l-charts__title-figure" src={figure} alt=""/>
        <div id="container"/>
      </div>
    );
  }
}
