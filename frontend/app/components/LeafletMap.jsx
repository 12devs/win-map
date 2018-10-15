import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import marker from 'leaflet/dist/images/marker-icon.png';

const myIcon = L.icon({
  iconUrl: marker,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41]
});

const data = [{marker: 'My Place', dataType: 'Current'}, {marker: 'Danger', dataType: 'Historical'}];

class MyMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      markers: [[51.505, -0.09]],
      marker: 'My Place',
      dataType: 'Current'
    };

    this.addMarker = this.addMarker.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.onMarkerChanged = this.onMarkerChanged.bind(this);
    this.onDataTypeChanged = this.onDataTypeChanged.bind(this);
  }

  addMarker(e) {
    console.log(e.latlng);
    const {markers} = this.state;
    markers.push(e.latlng);
    this.setState({markers});
  };

  getInitialState() {
    this.state.marker = '',
      this.state.dataType = '';
  }

  onMarkerChanged(e) {
    this.setState({
      marker: e.currentTarget.value
    });
  }

  onDataTypeChanged(e) {
    this.setState({
      dataType: e.currentTarget.value
    });
  }

  render() {
    let resultRows = data.map((result) =>
      <tbody key={result.marker}>
      <tr>
        <td><input type="radio" name="markers"
                   value={result.marker}
                   checked={this.state.marker === result.marker}
                   onChange={this.onMarkerChanged}/>{result.marker}</td>
        <td><input type="radio" name="data_type"
                   value={result.dataType}
                   checked={this.state.dataType === result.dataType}
                   onChange={this.onDataTypeChanged}/>{result.dataType}</td>
      </tr>
      </tbody>, this);

    return (
      <div style={{height: '100%'}}>
        <Map
          center={[51.505, -0.09]}
          onClick={this.addMarker}
          zoom={13}
          style={{height: '70%'}}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {this.state.markers.map((position, idx) =>
            <Marker key={`marker-${idx}`} position={position} icon={myIcon}>
              <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.{idx}</span>
              </Popup>
            </Marker>
          )}
        </Map>

        <table className="table">
          <thead>
          <tr>
            <th>Marker</th>
            <th>Data</th>
          </tr>
          </thead>
          {resultRows}
          <tfoot>
          <tr>
            <td>chosen marker: {this.state.marker} </td>
            <td>chosen data: {this.state.dataType} </td>
          </tr>
          </tfoot>
        </table>
      </div>

    );
  }
}

export default MyMap;