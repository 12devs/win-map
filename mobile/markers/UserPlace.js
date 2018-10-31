import React from 'react';
import services from '../services/index';
import { connect } from 'react-redux';
import actions from '../actions';
import blueIcon from '../assets/map_blue.png';
import { Marker, ProviderPropType } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';

class UserPlace extends React.Component {
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
      place: { lat: latitude, lng: lngCorrect, id },
      stations: [...this.props.stations]
    })
      .then(res => {
        const places = this.props.places.filter(el => !(el.id === id));
        places.push(res.place);
        let stationsData = this.props.stationsData;
        const stations = this.props.stations;
        stationsData = { ...stationsData, ...res.stationsData };
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({ places, stationsData, stations });
      });
  };

  render() {
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
        image={blueIcon}
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
    statistic: state.get('statistic'),

  };
}

export default connect(mapStateToProps, actions)(UserPlace);