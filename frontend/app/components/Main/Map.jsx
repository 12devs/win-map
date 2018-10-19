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
    this.state = {
      modalIsOpen: false,
      value: '',
      latlng: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e) {
    this.setState({modalIsOpen: true, latlng: e.latlng});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#111111';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addMarker() {
    if (this.props.actionType === 'Add') {
      return services.savePoint({
        point: {...this.state.latlng, name: this.state.value, type: this.props.markerType},
        stations: [...this.props.stations]
      })
        .then(res => {
          const points = this.props.points.toJS();
          let stationsData = this.props.stationsData.toJS();
          const stations = this.props.stations.toJS();
          stationsData = { ...stationsData, ...res.stationsData };
          points.push(res.point);
          stations.push(...Object.keys((res.stationsData || {})));
          this.props.updatePoints(points);
          this.props.updateStationsData(stationsData);
          this.props.updateStations(stations);
          this.props.updateStatistic();
          this.closeModal()
        });
    }
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const center = {
      lat: 51.505,
      lng: -0.09,
    };

    return (
      <div style={{height: '100%'}}>
        <Map
          center={center}
          onClick={(e)=>this.openModal(e)}
          zoom={11}
          style={{height: '600px'}}
        >
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Enter marker name!</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <button onClick={this.addMarker}>Send</button>
            </form>
            <button onClick={this.closeModal}>close</button>
          </Modal>
          <ReactLeafletSearch position="topleft"/>
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
