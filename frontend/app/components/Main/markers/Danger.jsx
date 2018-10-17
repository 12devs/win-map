import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';

class Danger extends React.Component {
  constructor(props) {
    super(props);
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
  }

  componentDidMount() {
    return this.getInfo();
  }

  getInfo() {
    return services.getInfo()
      .then(res => {
        console.log(res);
        this.props.setMainData(res);
      });
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

  render() {
    console.log('Danger Props', this.props);

    return (
      <Marker
        key={`marker-${id}`}
        draggable={this.state.draggable}
        onDragend={(e) => {
          this.updatePosition(id, blueIcon, e);
        }}
        onClick={() => {
          this.delMarker(id);
        }}
        position={[point.get('lat'), point.get('lng')]}
        icon={blueIcon}>
        <Popup>
                  <span>
                    {'Danger' + id}
                  </span>
        </Popup>
      </Marker>);

  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(Danger);
