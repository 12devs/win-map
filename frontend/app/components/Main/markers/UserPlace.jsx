import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';

class UserPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 51.505,
        lng: -0.09,
      },
      zoom: 13,
      draggable: true,
      markers: [{icon: blueIcon, LatLng: {lat: 51.50649873794456, lng: -0.08943557739257814}}],
      markerType: 'My Place',
      dataType: 'Current',
      event: 'Add'
    };
    this.getInfo = this.getInfo.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.delMarker = this.delMarker.bind(this);
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

  updatePosition(id, icon, e) {


  };

  delMarker(id) {
    if (this.props.actionType === 'Del') {
      return services.deletePoint({
        point: {id},
      })
        .then(res => {
          const points = this.props.points.toJS().filter(el => !(el.id === id));
          console.log('points',points);
          console.log('delMarker-------', this.props.points.toJS());

          this.props.updatePoints(points);
          console.log('delMarker-------', this.props.points.toJS());
        });
    }
  };

  render() {
    // console.log('UserPlace Props', this.props);

    return (
      <Marker
        draggable={this.state.draggable}
        onDragend={(e) => {
          this.updatePosition(this.props.point.id, blueIcon, e);
        }}
        onClick={() => {
          this.delMarker(this.props.point.id);
        }}
        position={[this.props.point.lat, this.props.point.lng]}
        icon={blueIcon}>

      </Marker>);
  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
  };
}

export default connect(mapStateToProps, actions)(UserPlace);
