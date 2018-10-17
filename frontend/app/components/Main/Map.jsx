import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions';
import { redIcon, blueIcon } from '../icons';
import Markers from './Markers';

class MyMap extends React.Component {
  constructor() {
    super();
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
    this.addMarker = this.addMarker.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    return this.getInfo();
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        console.log('rea', res);
        this.props.setMainData(res);
      });
  }

  addMarker(e) {
    if (this.props.actionType === 'Add') {
      return services.savePoint({
        point: {...e.latlng, name: 'point', type: this.props.markerType},
        stations: [...this.props.stations]
      })
        .then(res => {
          this.props.addPoint(res.point);
        });
    }
  };

  updatePosition(id, icon, e) {
    console.log(id);
    const markers = this.props.get('points');
    const marker = {icon, LatLng: e.target._latlng};
    if (marker != null) {
      markers[id] = marker;
      this.setState({markers});
    }
  };


  render() {
    console.log('Main Propss', this.props);
    const center = [this.state.center.lat, this.state.center.lng];

    return (
      <div style={{height: '100%'}}>
        <Map
          center={center}
          onClick={this.addMarker}
          zoom={11}
          style={{height: '600px'}}
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
