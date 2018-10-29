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

    return services.savePoint({
      [key]: {
        ...latlng,
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
      <div className="point">
        <div className="point__title">Add point</div>
        <div>
          <label>
            <input className="point__input-text" placeholder="Name" type="text" value={this.state.name} onChange={(e) => {
              this.setState({ name: e.target.value })
            }}/>
          </label>
        </div>
        <div className="point__create-map">
          <label className="point__create-map-label point__create-map-label--green">
            <input
                   className="point__create-map-radio"
                   type="radio"
                   value={'My Place'}
                   checked={this.state.markerType === 'My Place'}
                   onChange={this.changeMarketType}/>

              <span className="point__create-map-title">My place</span>
          </label>


          <label className="point__create-map-label point__create-map-label--red">
            <input
                   className="point__create-map-radio"
                   type="radio"
                   checked={this.state.markerType === 'Danger'}
                   value={'Danger'}
                   onChange={this.changeMarketType}/>

              <span className="point__create-map-title">Danger</span>
          </label>
        </div>
        {/* <button onClick={this.addMarker}>Send</button> */}
        <button className="point__create-map-close" onClick={() => {
          this.props.changeSavePointSettings({ show: false })
        }}></button>
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
