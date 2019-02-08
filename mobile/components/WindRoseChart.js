import React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/index'
import ChartView from 'react-native-highcharts'
import { ScrollView } from 'react-native'

class WindRoseChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {},
    }
    this.newChart = this.newChart.bind(this)
  }

  componentDidMount() {
    if (this.props.stationId) {
      this.newChart(this.props)
    }
  }

  newChart() {
    let chart = this.props.stationsData[this.props.stationId].windRoseData
    chart.exporting = { enabled: false }
    chart.series[0].color = '#e8eaf6'
    chart.series[1].color = '#c5cae9'
    chart.series[2].color = '#9fa8da'
    chart.series[3].color = '#7986cb'
    chart.series[4].color = '#5c6bc0'
    chart.series[5].color = '#3f51b5'
    chart.series[6].color = '#3949ab'
    chart.series[7].color = '#303f9f'
    chart.series[8].color = '#283593'
    this.setState({
      config: chart,
    })
  }

  render() {
    return (
      <ScrollView>
        <ChartView style={{ height: 300 }} config={this.state.config} more={true} />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    stationsData: state.get('stationsData'),
  }
}

export default connect(mapStateToProps, actions)(WindRoseChart)

