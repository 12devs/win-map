import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";
import WindRoseChart from './WindRoseChart';
import geolib from "geolib";

class PointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.delMarker = this.delMarker.bind(this);
    this.goToMarker = this.goToMarker.bind(this);
  }

  delMarker() {
    const { point, type } = this.props.info.toJS();
    const { id } = point;
    return services.deletePoint({
      [type]: { id },
    })
      .then(res => {
        if (type === 'place') {
          const places = this.props.places.toJS().filter(el => !(el.id === id));
          this.props.updateMainData({ places });
        }
        if (type === 'danger') {
          const dangers = this.props.dangers.toJS().filter(el => !(el.id === id));
          this.props.updateMainData({ dangers });
        }
      });
  };

  goToMarker() {
    const { point } = this.props.info.toJS();
    const points = [0, 90, 180, 270].map(bearing => {
      return geolib.computeDestinationPoint(point, 5000, bearing);
    });
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (minLat && maxLat && minLng && maxLng) {
      this.props.changeMapBounds([[minLat + Math.random() / 1000000, minLng], [maxLat, maxLng]]);
      this.props.changeInfo({ point: null, type: null });
    }
  };

  render() {
    const { point, type } = this.props.info.toJS();

    if (!(point && type)) {
      return null
    }

    return (
      <div className="point__data">
        <div className="point__data-name">{point.name}</div>
        <div className="point__data-ico"/>
        <div className="point__data-type">Type {type}</div>
        <div className="point__data-text">Lat: {point.lat}</div>
        <div className="point__data-text">Lng: {point.lng}</div>
        <button className="point__data-btn-close" onClick={() => {
          this.props.changeInfo({point: null, type: null});
        }}/>
        <button onClick={this.goToMarker}>goToMarker</button>
        <button  className="point__data-btn-remove" onClick={() => {
          this.delMarker()
            .then(() => {
              this.props.changeInfo({ point: null, type: null });
            });
          return false
        }}>Remove point
        </button>
        <WindRoseChart stationId={point.station_id}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(PointSettings);
