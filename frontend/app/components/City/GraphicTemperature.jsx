import React, { Component } from 'react';
import Chart from 'chart.js';
import figure from "./../../assets/img/figure.svg";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.src) {
      this.newChart(this.props)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.newChart(this.props);
    }
  }

  newChart(props) {
    let { src} = props;
    const labels = src.map(elem => elem.date);
    const Data = src.map(elem => elem.temperature);
    const data = {
      labels,
      datasets: [{
        label: "Temperature",
        data: Data,
        backgroundColor: [
          '#4BC7C9',
        ],
        borderColor: [
          '#4BC7C9',
        ],
        borderWidth: 1
      }]
    };
    const ctx = document.getElementById("myChartTemp").getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0
            }
          }]
        }
      }
    });
  }

  render() {
    if (!this.props.src){
      return null
    }
    return (
      <div className="l-charts__container">
        <div className="l-charts__title">Your Temperature</div>
        <img className="l-charts__title-figure" src={figure} alt=""/>
        <canvas id="myChartTemp"></canvas>
      </div>
    );
  }
}
