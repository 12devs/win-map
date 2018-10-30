import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions';
import { blueIcon } from '../../icons/index';

class UserPlace extends React.Component {
  constructor(props) {
    super(props);
    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(id, e) {
    let { lat, lng } = e.target._latlng;
    let lngCorrect = lng;
    lngCorrect = lngCorrect % 360;
    if (lngCorrect > 180) {
      lngCorrect -= 360;
    }
    if (lngCorrect < -180) {
      lngCorrect += 360;
    }

    return services.movePoint({
      place: {lat, lng: lngCorrect, id},
      stations: [...this.props.stations]
    })
      .then(res => {
        const places = this.props.places.filter(el => !(el.id === id));
        places.push(res.place);
        let stationsData = this.props.stationsData;
        const stations = this.props.stations;
        stationsData = {...stationsData, ...res.stationsData};
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({places, stationsData, stations});
      });
  };

  render() {
    return (
      <Marker
        draggable={true}
        onDragend={(e) => {
          this.updatePosition(this.props.point.id, e);
        }}
        onClick={() => {
          this.props.updateReduxState({info: {point: this.props.point, type:'place'}});
        }}
        position={[this.props.point.lat, this.props.point.lng]}
        icon={blueIcon}>
      </Marker>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    statistic: state.get('statistic'),

  };
}

export default connect(mapStateToProps, actions)(UserPlace);
