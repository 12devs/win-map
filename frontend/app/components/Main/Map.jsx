import React from 'react';
import { Map, TileLayer, LayersControl, LayerGroup, Rectangle } from 'react-leaflet';
import { connect } from 'react-redux';
import actions from './../../actions';
import Markers from './markers/Markers';
import { ReactLeafletSearch } from 'react-leaflet-search';
import Modal from 'react-modal';

const { BaseLayer, Overlay } = LayersControl;

Modal.setAppElement('#root');

class MyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let bounds = [[50.505, -29.09], [52.505, 29.09]];

    if (this.props.mapBounds) {
      bounds = this.props.mapBounds
    }

    return (
      <div style={{ height: '100%' }}>
        <Map
          onClick={(e) => this.props.updateReduxState({savePointSettings:{ show: true, latlng: e.latlng }})}
          bounds={bounds}
          maxBounds={[[90, -180], [-90, 180]]}
          style={{ height: '100vh' }}
        >
          <ReactLeafletSearch position="topleft"/>

          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            <BaseLayer name="Arcgisonline With Names">
              <LayerGroup>

                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                  url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                />
                <TileLayer
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}'
                  minZoom={0}
                  maxZoom={20}
                  ext='png'
                />
              </LayerGroup>
            </BaseLayer>

            <BaseLayer name="Arcgisonline">
              <LayerGroup>

                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                  url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                />
              </LayerGroup>
            </BaseLayer>

          </LayersControl>

          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Markers/>
          <Rectangle bounds={[[90, -180], [-90, 180]]}/>
        </Map>
      </div>
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
    mapCenter: state.get('mapCenter'),
    mapBounds: state.get('mapBounds'),
    notifications: state.get('notifications'),
  };
}

export default connect(mapStateToProps, actions)(MyMap);
