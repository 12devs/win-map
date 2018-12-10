import React from 'react';
import services from '../../services/index';
import { connect } from 'react-redux';
import actions from '../../actions/index';
import blueIcon from '../../assets/point_blue-mobile.png';
import { Marker, ProviderPropType } from 'react-native-maps';

class UserPlace extends React.Component {
  constructor(props) {
    super(props);
    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(id, e) {
    let { latitude, longitude } = e.nativeEvent.coordinate;
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
        onDragEnd={(e) => {
          this.updatePosition(this.props.point.id, e);
          this.props.updateStatistic()
        }}
        onPress={(e) => {
          e.stopPropagation();
          this.props.updateReduxState({ info: { point: this.props.point, type: 'place' } });
          this.props.navigation.navigate('PointSettings');
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
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(UserPlace);
