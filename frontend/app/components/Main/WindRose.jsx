import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import SectorPolygon from './SectorPolygon';

// const getStats =(points, stationsData)=> {
// const places = points.filter(point=> point.type=)
// };


class WindRose extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { point, dist } = this.props;
    // const { history } = this.props.stationsData[point.station_id];

    const history = {
      ENE: 22.81,
      ESE: 6.14,
      E: 13.16,
      NE: 33.77,
      NNE: 21.49,
      NNW: 0.44,
      NW: 0,
      N: 2.19,
      SE: 0,
      SSE: 0,
      SSW: 0,
      SW: 0,
      S: 0,
      WNW: 1,
      WSW: 0,
      W: 10,
    };

    const arr = Object.keys(history);
    return (
      <div>
        {arr.map((direction, i) => {
          console.log(direction);
          return (<SectorPolygon key={i} color="purple" point={point} dist={history[direction] * dist / 100}
                                 direction={direction}/>)
        })}
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
  };
}

export default connect(mapStateToProps, actions)(WindRose);
