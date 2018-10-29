import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";

class SavePointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      markerType: '',
    };
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker(markerType) {
    const { latlng } = this.props.savePointSettings;
    const { name } = this.state;

    let key;
    if (markerType === 'Danger') {
      key = 'danger';
    } else {
      key = 'place';
    }

    let lngCorrect = latlng.lng;
    lngCorrect = lngCorrect % 360;
    if (lngCorrect > 180) {
      lngCorrect -= 360;
    }
    if (lngCorrect < -180) {
      lngCorrect += 360;
    }
    return services.savePoint({
      [key]: {
        lat: latlng.lat,
        lng: lngCorrect,
        name
      },
      stations: [...this.props.stations]
    })
      .then(res => {
        const { danger, place } = res;
        let places = this.props.places;
        let dangers = this.props.dangers;
        let stationsData = this.props.stationsData;
        const stations = this.props.stations;
        stationsData = { ...stationsData, ...res.stationsData };
        if (danger) {
          dangers.push(danger);
        }
        if (place) {
          places.push(place);
        }
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({ places, dangers, stationsData, stations });
        this.props.updateReduxState({ savePointSettings: { show: false } });
      });
  };

  render() {
    const { show } = this.props.savePointSettings;

    if (!show) {
      return null;
    }

    return (
      <div>
        <div className='point__container' onClick={() => {
          this.props.updateReduxState({ savePointSettings: { show: false } });
        }}>
        </div>
        <div className="point">
          <div className="point__title">Add point</div>
          <div>
            <label>
              <input className="point__input-text" placeholder="Name" type="text" value={this.state.name}
                     onChange={(e) => {
                       this.setState({ name: e.target.value });
                     }}/>
            </label>
          </div>
          <div className="point__create-map">
            <label className="point__create-map-label point__create-map-label--green">
              <input
                className="point__create-map-radio"
                type="radio"
                value={'My Place'}
                onChange={() => {
                  this.addMarker('My Place');
                }}/>
              <span className="point__create-map-title">My place</span>
            </label>


            <label className="point__create-map-label point__create-map-label--red">
              <input
                className="point__create-map-radio"
                type="radio"
                value={'Danger'}
                onChange={() => {
                  this.addMarker('Danger');
                }}/>

              <span className="point__create-map-title">Danger</span>
            </label>
          </div>
          <button className="point__create-map-close" onClick={() => {
            this.props.updateReduxState({ savePointSettings: { show: false } });
          }}/>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    markerType: state.get('markerType'),
    info: state.get('info'),
    notificationSettings: state.get('notificationSettings'),
    savePointSettings: state.get('savePointSettings'),
    stationsData: state.get('stationsData'),
  };
}

export default connect(mapStateToProps, actions)(SavePointSettings);
