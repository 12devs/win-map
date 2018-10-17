import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';

class UserPlace extends React.Component {
  constructor(props) {
    super(props);
    this.delMarker = this.delMarker.bind(this);
  }

  delMarker(id) {
    if (this.props.actionType === 'Del') {
      return services.deletePoint({
        point: {id},
      })
        .then(res => {
          const points = this.props.points.toJS().filter(el => !(el.id === id));
          console.log('points', points);
          console.log('delMarker-------', this.props.points.toJS());

          this.props.updatePoints(points);
          console.log('delMarker-------', this.props.points.toJS());
        });
    }
  };

  updatePosition(id, icon, e) {
    console.log({
      point: { ...e.target._latlng, id,},
      stations: [...this.props.stations]
    })
    return services.movePoint({
      point: { ...e.target._latlng, id,},
      stations: [...this.props.stations]
    })
      .then(res => {
        const points = this.props.points.toJS().filter(el => !(el.id === id));
        points.push(res.point);
        console.log('points', points);


        this.props.updatePoints(points);

      });
  };


  render() {

    return (
      <Marker
        draggable={true}
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
