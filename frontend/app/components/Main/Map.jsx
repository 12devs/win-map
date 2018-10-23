import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions';
import Markers from './markers/Markers';
import { ReactLeafletSearch } from 'react-leaflet-search';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

class MyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const center = {
      lat: 51.505,
      lng: -0.09,
    };

    return (
      <div style={{ height: '100%' }}>
        <Map
          center={center}
          onClick={(e) => this.props.changeSavePointSettings({ show: true, latlng: e.latlng })}
          zoom={11}
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
  };
}

export default connect(mapStateToProps, actions)(MyMap);
