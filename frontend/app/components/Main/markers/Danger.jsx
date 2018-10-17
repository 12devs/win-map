import React from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import services from '../../../services/index';
import { connect } from 'react-redux';
import actions from '../../../actions/points';
import { redIcon, blueIcon } from '../../icons/index';
import SectorPolygon from '../SectorPolygon';

class Danger extends React.Component {
  constructor(props) {
    super(props);
    this.delMarker = this.delMarker.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  delMarker(id) {
    if (this.props.actionType === 'Del') {
      return services.deletePoint({
        point: {id},
      })
        .then(res => {
          const points = this.props.points.toJS().filter(el => !(el.id === id));
          this.props.updatePoints(points);
        });
    }
  };

  updatePosition(id, icon, e) {
    return services.movePoint({
      point: {...e.target._latlng, id,},
      stations: [...this.props.stations]
    })
      .then(res => {
        const points = this.props.points.toJS().filter(el => !(el.id === id));
        points.push(res.point);
        let stationsData = this.props.stationsData.toJS();
        const stations = this.props.stations.toJS();
        stationsData = { ...stationsData, ...res.stationsData };
        stations.push(...Object.keys(res.stationsData));
        this.props.updatePoints(points);
        this.props.updateStationsData(stationsData);
        this.props.updateStations(stations);
      });
  };

  render() {
    return (
      <div><Marker
        draggable={true}
        onDragend={(e) => {
          this.updatePosition(this.props.point.id, blueIcon, e);
        }}
        onClick={() => {
          this.delMarker(this.props.point.id);
        }}
        position={[this.props.point.lat, this.props.point.lng]}
        icon={redIcon}>
        {/*<Popup>*/}
                  {/*<span>*/}
                    {/*{`MARKER ${this.props.point.name} ${this.props.point.id}`}*/}
                  {/*</span>*/}
        {/*</Popup>*/}
      </Marker>
        <SectorPolygon point={this.props.point} dist={5000} direction={'N'} />
      </div>);

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

export default connect(mapStateToProps, actions)(Danger);
