import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';
import markerBlue from '../assets/img/map_blue.png';
import markerRed from '../assets/img/map_red.png';

const redIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const blueIcon = L.icon({
  iconUrl: markerBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const data = [{markerType: 'My Place', dataType: 'Current', event: 'Add'}, {
  markerType: 'Danger',
  dataType: 'Historical',
  event: 'Del'
}];

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

    this.addMarker = this.addMarker.bind(this);
    this.delMarker = this.delMarker.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.onMarkerChanged = this.onMarkerChanged.bind(this);
    this.onDataTypeChanged = this.onDataTypeChanged.bind(this);
    this.toggleDraggable = this.toggleDraggable.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onEventChanged = this.onEventChanged.bind(this);
  }

  addMarker(e) {
    if (this.state.event === 'Add') {
      console.log(e.latlng);
      const {markers} = this.state;
      const icon = this.state.markerType === 'My Place' ? blueIcon : redIcon;
      markers.push({icon, LatLng: e.latlng});
      this.setState({markers});
      console.log(this.state.markers);
    }
  };

  delMarker(id) {
    if (this.state.event === 'Del') {
      console.log('id', id);
      const {markers} = this.state;
      delete markers[id];
      this.setState({markers});
      console.log(this.state.markers);
    }
  };

  getInitialState() {
    this.state.marker = '';
    this.state.dataType = '';
    this.state.event = '';
  }

  onMarkerChanged(e) {
    this.setState({
      markerType: e.currentTarget.value
    });
  }

  onDataTypeChanged(e) {
    this.setState({
      dataType: e.currentTarget.value
    });
  }

  onEventChanged(e) {
    this.setState({
      event: e.currentTarget.value
    });
  }

  toggleDraggable() {
    this.setState({draggable: !this.state.draggable});
  };

  updatePosition(id,icon, e) {
    console.log(id);
    const {markers} = this.state;
    const marker = {icon, LatLng: e.target._latlng};
    if (marker != null) {
      markers[id] = marker;
      this.setState({markers});
    }
    console.log('this.state.markers', this.state.markers);
  };

  render() {
    const center = [this.state.center.lat, this.state.center.lng];

    let resultRows = data.map((result, id) =>
      <tbody key={id}>
      <tr>
        <td><input type="radio" name="markers"
                   value={result.markerType}
                   checked={this.state.markerType === result.markerType}
                   onChange={this.onMarkerChanged}/>{result.markerType}</td>
        <td><input type="radio" name="data_type"
                   value={result.dataType}
                   checked={this.state.dataType === result.dataType}
                   onChange={this.onDataTypeChanged}/>{result.dataType}</td>
        <td><input type="radio" name="event"
                   value={result.event}
                   checked={this.state.event === result.event}
                   onChange={this.onEventChanged}/>{result.event}</td>
      </tr>
      </tbody>, this);

    return (
      <div style={{height: '100%'}}>
        <Map
          center={center}
          onClick={this.addMarker}
          zoom={13}
          style={{height: '600px'}}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.state.markers.map((position, idx) =>
            <Marker
              key={`marker-${idx}`}
              draggable={this.state.draggable}
              onDragend={(e) => {
                this.updatePosition(idx, position.icon, e);
              }}
              onClick={() => {
                this.delMarker(idx);
              }}
              position={position.LatLng}
              icon={position.icon}>
              <Popup>
                  <span>
                    {'MARKER' + idx}
                  </span>
              </Popup>
            </Marker>
          )}
          <Polygon color="purple" positions={[[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]]} />
        </Map>
        <table className="table">
          <thead>
          <tr>
            <th>Marker</th>
            <th>Data</th>
            <th>Event</th>
          </tr>
          </thead>
          {resultRows}
          <tfoot>
          <tr>
            <td>chosen marker: {this.state.markerType} </td>
            <td>chosen data: {this.state.dataType} </td>
            <td>chosen event: {this.state.event} </td>
          </tr>
          </tfoot>
        </table>
      </div>

    );
  }
}

export default MyMap;
