import React from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import ChartView from 'react-native-highcharts';
import { ScrollView, Text, View } from 'react-native';

class WindRoseChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      options: {}
    };
    this.newChart = this.newChart.bind(this);
  }

  componentDidMount() {
    if (this.props.stationId) {
      this.newChart(this.props);
    }
  }

  newChart() {
    this.setState({
      config: this.props.stationsData[this.props.stationId].windRoseData,
      options: {}
    });
  }

  render() {
    return (
      <ScrollView>
        <ChartView style={{ height: 300 }} config={this.state.config} options={this.state.options}/>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(WindRoseChart);

