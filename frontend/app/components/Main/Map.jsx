import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions';
import { redIcon, blueIcon } from '../icons';
import Markers from './markers/Markers';

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker(e) {
    if (this.props.actionType === 'Add') {
      return services.savePoint({
        point: { ...e.latlng, name: 'point', type: this.props.markerType },
        stations: [...this.props.stations]
      })
        .then(res => {
          const points = this.props.points.toJS();
          let stationsData = this.props.stationsData.toJS();
          const stations = this.props.stations.toJS();
          stationsData = { ...stationsData, ...res.stationsData };
          points.push(res.point);
          stations.push(...Object.keys(res.stationsData));
          this.props.updatePoints(points);
          this.props.updateStationsData(stationsData);
          this.props.updateStations(stations);
        });
    }
  };

  render() {
    const center = {
      lat: 51.505,
      lng: -0.09,
    };

    return (
      <div style={{ height: '100%' }}>
        <Map
          center={center}
          onClick={this.addMarker}
          zoom={11}
          style={{ height: '600px' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Markers/>
        </Map>
      </div>
    );
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

export default connect(mapStateToProps, actions)(MyMap);
