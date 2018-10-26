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
    this.changeMarketType = this.changeMarketType.bind(this);
  }

  changeMarketType = (e) => {
    this.setState({ markerType: e.currentTarget.value })
  };

  addMarker() {
    const { latlng } = this.props.savePointSettings.toJS();
    const { name, markerType } = this.state;

    let key;
    if (markerType === 'Danger') {
      key = 'danger'
    } else {
      key = 'place'
    }

    let lngCorrect = latlng.lng;
    do {
      if (lngCorrect > 180) {
        lngCorrect -= 360;
      } else if (lngCorrect < -180){
          lngCorrect += 360;
      }
    } while (!((lngCorrect <= 180) && (lngCorrect > -180)));

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
        let places = this.props.places.toJS();
        let dangers = this.props.dangers.toJS();
        let stationsData = this.props.stationsData.toJS();
        const stations = this.props.stations.toJS();
        stationsData = { ...stationsData, ...res.stationsData };
        if (danger) {
          dangers.push(danger);
        }
        if (place) {
          places.push(place);
        }
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateMainData({ places, dangers, stationsData, stations });
        this.props.changeSavePointSettings({ show: false })
      });
  };

  render() {
    const { show } = this.props.savePointSettings.toJS();

    if (!show) {
      return null
    }

    return (
      <div style={{
        whiteSpace: "pre",
        position: "absolute",
        left: "100px",
        top: "300px",
        zIndex: 1000,
        padding: '50px',
        backgroundColor: 'white',
        margin: "auto",
        width: "60%"
      }}>
        <div>
          <label>Name
            <input type="text" value={this.state.name} onChange={(e) => {
              this.setState({ name: e.target.value })
            }}/>
          </label>
        </div>
        <div>
          <label>Type
            Place
            <input type="radio"
                   value={'My Place'}
                   checked={this.state.markerType === 'My Place'}
                   onChange={this.changeMarketType}/>

            <input type="radio"
                   checked={this.state.markerType === 'Danger'}
                   value={'Danger'}
                   onChange={this.changeMarketType}/>
          </label>
        </div>
        <button onClick={this.addMarker}>Send</button>
        <button onClick={() => {
          this.props.changeSavePointSettings({ show: false })
        }}>Close
        </button>
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
