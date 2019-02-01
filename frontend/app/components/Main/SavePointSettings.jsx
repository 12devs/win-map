import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";
import { Menu, Icon } from 'antd';
import '../../assets/sass/components/_menu.scss';
import { confirmAlert } from 'react-confirm-alert';

const markerLimit = 50;

class SavePointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Marker Name',
      markerType: '',
      error: '',
    };
    this.addMarker = this.addMarker.bind(this);
  }

  maxPointsAlert = () => {
    confirmAlert({
      customUI: par => {
        const { onClose } = par;
        return (
          <div className={'confirm__alert'}>
            <div style={{ margin: '50px' }}>
              <h1>Marker limit!</h1>
              <p>{`You have exceeded the limit of ${markerLimit} markers`}</p>
              <button className={"confirm__button"} onClick={onClose}>Ok</button>
            </div>
          </div>
        );
      },
    });
  };

  addMarker(markerType) {
    const { latlng } = this.props.savePointSettings;
    const { places, dangers } = this.props;
    const { name } = this.state;
    let key;

    if ((places.length + dangers.length) > markerLimit) {
      this.props.updateReduxState({ isLoader: false });
      return this.maxPointsAlert();
    }

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
    if (localStorage.windToken) {
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
          this.setState({ markerType: '', error: '' });
          this.props.updateReduxState({ info: { point: res[key], type: key }, isLoader: false });
        });
    }
    return services.pointInfo({
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
          dangers = [...dangers, danger];
        }
        if (place) {
          places = [...places, place];
        }
        stations.push(...Object.keys((res.stationsData || {})));
        this.props.updateReduxState({ places, dangers, stationsData, stations });
        this.props.updateReduxState({ savePointSettings: { show: false } });
        this.setState({ markerType: '', error: '' });
        this.props.updateReduxState({ info: { point: res[key], type: key }, isLoader: false });
      });
  };

  render() {
    const { show, containerPoint } = this.props.savePointSettings;
    if (!show) {
      return null;
    }

    return (
      <div>
        <div className='point__container' onClick={() => {
          this.setState({ markerType: '' });
          this.props.updateReduxState({ savePointSettings: { show: false } });
        }}>
        </div>
        <div
          style={{ top: `${containerPoint.y + 48}px`, left: `${containerPoint.x + 76}px` }}
          className="point">
          <Menu
            onClick={this.handleClick}
            mode="vertical">
            <Menu.Item
              onClick={() => {
                this.addMarker('My Place');
                this.props.updateReduxState({ savePointSettings: { show: false, isLoader: true } });
              }}
              key="1">
              Add Place Marker
            </Menu.Item>

            <Menu.Item onClick={() => {
              this.addMarker('Danger');
              this.props.updateReduxState({ savePointSettings: { show: false, isLoader: true } });
            }} key="2">
              Add Danger Marker
            </Menu.Item>
          </Menu>
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
    savePointSettings: state.get('savePointSettings'),
    stationsData: state.get('stationsData'),
    info: state.get('info'),
    isLoader: state.get('isLoader'),
  };
}

export default connect(mapStateToProps, actions)(SavePointSettings);
