import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";
import WindRoseChart from './WindRoseChart';
import geolib from "geolib";

class PointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      edit: false,
    };
    this.delMarker = this.delMarker.bind(this);
    this.goToMarker = this.goToMarker.bind(this);
    this.updatePoint = this.updatePoint.bind(this);
  }

  delMarker() {
    const { point, type } = this.props.info;
    const { id } = point;
    return services.deletePoint({
      [type]: { id },
    })
      .then(res => {
        if (type === 'place') {
          const places = this.props.places.filter(el => !(el.id === id));
          this.props.updateReduxState({ places });
        }
        if (type === 'danger') {
          const dangers = this.props.dangers.filter(el => !(el.id === id));
          this.props.updateReduxState({ dangers });
        }
      });
  };

  updatePoint() {
    const { point, type } = this.props.info;
    const { name } = this.state;
    this.setState({ name: '', edit: false });
    if (!name) {
      return
    }
    point.name = name;
    return services.updatePoint({
      [type]: point,
    })
      .then(res => {
        if (type === 'place') {
          let places = this.props.places.map(elem => {
            if (elem.id === point.id) {
              elem.name = name;
            }
            return elem
          });
          this.props.updateReduxState({ places });
        }
        if (type === 'danger') {
          let dangers = this.props.dangers.map(elem => {
            if (elem.id === point.id) {
              elem.name = name;
            }
            return elem
          });
          this.props.updateReduxState({ dangers });
        }
      });
  };

  goToMarker() {
    const { point } = this.props.info;
    const points = [0, 90, 180, 270].map(bearing => {
      return geolib.computeDestinationPoint(point, 5000, bearing);
    });
    const { minLat, maxLat, minLng, maxLng } = geolib.getBounds(points);
    if (minLat && maxLat && minLng && maxLng) {
      this.props.updateReduxState({ mapBounds: [[minLat + Math.random() / 1000000, minLng], [maxLat, maxLng]] });
      this.props.updateReduxState({ info: { point: null, type: null } });
    }
  };

  render() {
    const { point, type } = this.props.info;

    let color;
    if (type === 'place'){
      color = 'rgba(0, 138, 230, 1)'
    } else {
      color = 'rgba(255, 112, 77, 1)'
    }

    if (!(point && type)) {
      return null;
    }

    return (
      <div>
        <div className='point__container' onClick={() => {
          this.updatePoint();
          this.props.updateReduxState({ info: { point: null, type: null } });
        }}>
        </div>
        <div className="point__data" style={{backgroundColor: color}}>
          {!this.state.edit ?
            <div className="point__data-name" onClick={() => this.setState({ edit: true })}>{point.name}</div> :
            <div>
              <input className="point__input-text" placeholder="new Name" type="text" value={this.state.name}
                     onChange={(e) => {
                       this.setState({ name: e.target.value });
                     }}
                     onBlur={() => {
                       this.updatePoint();
                     }}
                     autoFocus={true}
              />
            </div>
            }

          <div className="point__data-type">{type}</div>
          <div onClick={()=>this.updatePoint()}><WindRoseChart  stationId={point.station_id}/></div>
          <div className="point__data-text">Lat: {point.lat}</div>
          <div className="point__data-text">Lng: {point.lng}</div>
          <button className="point__data-btn-close" onClick={() => {
            this.props.updateReduxState({ info: { point: null, type: null } });
          }}/>
          <button className="point__data-btn-meta point__data-btn-meta--marker" onClick={this.goToMarker}>Go to marker
          </button>
          <button className="point__data-btn-meta point__data-btn-meta--remove" onClick={() => {
            this.delMarker()
              .then(() => {
                this.props.updateReduxState({ info: { point: null, type: null } });
              });
            return false
          }}>Remove point
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(PointSettings);
