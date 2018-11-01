import React from 'react';
import services from '../services/index';
import { connect } from 'react-redux';
import actions from '../actions';
import redIcon from '../assets/point_red-mobile.png';
import { Marker, ProviderPropType } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

class Danger extends React.Component {
  constructor(props) {
    super(props);
    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(id, e) {
    let { latitude, longitude } = e.nativeEvent.coordinate;
    console.log(e.nativeEvent.coordinate);
    let lngCorrect = longitude;
    lngCorrect = lngCorrect % 360;
    if (lngCorrect > 180) {
      lngCorrect -= 360;
    }
    if (lngCorrect < -180) {
      lngCorrect += 360;
    }
    return services.movePoint({
      danger: { lat: latitude, lng: lngCorrect, id, },
      stations: [...this.props.stations]
    })
      .then(res => {
        const dangers = this.props.dangers.filter(el => !(el.id === id));
        dangers.push(res.danger);
        let stationsData = this.props.stationsData;
        const stations = this.props.stations;
        stationsData = { ...stationsData, ...(res.stationsData || {}) };
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({ dangers, stations, stationsData });
      });
  };

  render() {
    const { viewType } = this.props;
    return (
      <Marker
        coordinate={{
          latitude: this.props.point.lat,
          longitude: this.props.point.lng
        }}
        onDragEnd={(e) => this.updatePosition(this.props.point.id, e)}
        onPress={() => {
          this.props.updateReduxState({ info: { point: this.props.point, type: 'place' } });
          Actions.PointSettings();
        }}
        draggable
        image={redIcon}
      />

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

export default connect(mapStateToProps, actions)(Danger);
