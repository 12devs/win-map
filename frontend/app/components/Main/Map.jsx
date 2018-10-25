import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import actions from './../../actions';
import Markers from './markers/Markers';
import { ReactLeafletSearch } from 'react-leaflet-search';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class MyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let bounds = [[50.505, -29.09], [52.505, 29.09]];

    if (this.props.mapBounds){
      bounds = this.props.mapBounds.toJS()
    }

    return (
      <div style={{ height: '100%' }}>
        <Map
          onClick={(e) => this.props.changeSavePointSettings({ show: true, latlng: e.latlng })}
          bounds={bounds}
          style={{ height: '600px' }}
        >
          <ReactLeafletSearch position="topleft"/>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Markers/>
          <div style={{ zIndex: '3000' }}><input type="range" id="start" name="size"
                                                 min="0" max="1000000"
                                                 onChange={(e) => this.props.changeScaleWind(e.target.value)}/></div>
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
