import React from 'react';
import { Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from './../../services';
import { connect } from 'react-redux';
import actions from './../../actions/points';
import { redIcon, blueIcon } from '../icons';

class Markers extends React.Component {
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


  render() {
    return (
      <div>
        {this.props.points.map((point, id) => {

            console.log(typeof point.get('lat'), typeof point.get('lng'));
            if(point.get())
            return (<Marker
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
                    {'MARKER' + id}
                  </span>
              </Popup>
            </Marker>);
          }
        )}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(Markers);
