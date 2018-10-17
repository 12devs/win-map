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
          points.push(res.point);
          console.log('addMarker new points', points);
          this.props.updatePoints(points);
          console.log('-------------');
          console.log(this.props);
          console.log(JSON.parse(JSON.stringify(this.props)));
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
          <Polygon color="purple" positions={[[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]]}/>
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
