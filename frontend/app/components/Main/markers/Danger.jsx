import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';

class Danger extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
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
