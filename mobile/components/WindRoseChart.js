import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/index';
import ChartView from 'react-native-highcharts';
import { ScrollView, Text, View } from 'react-native';

class WindRoseChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
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
    });
  }

  render() {
    return (
      <ScrollView>
        <ChartView style={{ height: 300 }} config={this.state.config} more={true}/>
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

