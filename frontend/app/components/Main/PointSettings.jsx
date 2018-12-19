import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";
import WindRoseChart from './WindRoseChart';
import Stats from './Stats';
import geolib from "geolib";
import { Tabs } from 'antd';
import { confirmAlert } from 'react-confirm-alert';

const COMPONENTS = {
  WindRoseChart,
  Stats,
};

class PointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dangerRadius: '',
      editName: false,
      editDangerRadius: false,
      component: 'WindRoseChart',
      validDistance: true,
    };
    this.delMarker = this.delMarker.bind(this);
    this.goToMarker = this.goToMarker.bind(this);
    this.updatePoint = this.updatePoint.bind(this);
  }

  delMarker() {
    const { point, type } = this.props.info;
    const { id } = point;
    if (localStorage.windToken) {
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
    }
    else {
      if (type === 'place') {
        const places = this.props.places.filter(el => !(el.id === id));
        this.props.updateReduxState({ places });
      }
      if (type === 'danger') {
        const dangers = this.props.dangers.filter(el => !(el.id === id));
        this.props.updateReduxState({ dangers });
      }
    }

  };

  delAlert = () => {
    confirmAlert({
      customUI: par => {
        const { onClose } = par;
        return (
          <div className={'confirm__alert'}>
            <div style={{ margin: '50px' }}>
              <h1>Are you sure?</h1>
              <p>You want to remove marker?</p>
              <button className={"confirm__button"} onClick={() => {
                this.delMarker();
                this.props.updateReduxState({ info: { point: null, type: null } });
                onClose();
              }}>Yes
              </button>
              <button className={"confirm__button"} onClick={onClose}>No</button>
            </div>
          </div>
        );
      },
    });
  };

  updatePoint() {
    const { point, type } = this.props.info;
    const { name, dangerRadius } = this.state;
    this.setState({ name: '', editName: false, editDangerRadius: false, dangerRadius: '' });
    if (!name && !dangerRadius) {
      return;
    }
    if (name) {
      point.name = name;
    }
    if (dangerRadius && (dangerRadius < 0 || (isNaN(Number(dangerRadius))))) {
      return;
    }
    if (dangerRadius) {
      point.dangerRadius = parseInt(dangerRadius, 10);
    }
    if (localStorage.windToken) {
      return services.updatePoint({
        [type]: point,
      })
        .then(res => {
          let markers = this.props[`${type}s`].map(elem => {
            if (elem.id === point.id) {
              if (name) {
                elem.name = name;
              }
              if (dangerRadius) {
                elem.dangerRadius = parseInt(dangerRadius, 10);
              }
            }
            return elem;
          });
          this.props.updateReduxState({ markers });
        });
    }
    else {
      let markers = this.props[`${type}s`].map(elem => {
        if (elem.id === point.id) {
          if (name) {
            elem.name = name;
          }
          if (dangerRadius) {
            elem.dangerRadius = parseInt(dangerRadius, 10);
          }
        }
        return elem;
      });
      this.props.updateReduxState({ markers });
    }
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
    let { component } = this.state;
    if (type === 'danger') {
      component = 'WindRoseChart';
    }
    const Component = COMPONENTS[component];

    let color;
    if (type === 'place') {
      color = '#0A5BB9';
    } else {
      color = '#DE3231';
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
        {/* <div className="point__data" style={{ backgroundColor: color }}> */}
        <div className="point__data">
          <div style={{ flex: 1, overflow: 'auto' }}>
            {!this.state.editName ?
              <div className="point__data-name" onClick={() => this.setState({ editName: true })}>{point.name}</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input className="point__input-text valid" placeholder="new Name" type="text" value={this.state.name}
                       onChange={(e) => {
                         this.setState({ name: e.target.value });
                       }}
                       onKeyDown={e => {
                         if (e.keyCode === 13) {
                           this.updatePoint();
                         }
                       }}
                       onBlur={() => {
                         this.updatePoint();
                       }}
                       autoFocus={true}
                />
              </div>
            }
            {!this.state.editDangerRadius ?
              <div className={` ${point.dangerRadius && 'point__data-name'} `}
                   onClick={() => this.setState({ editDangerRadius: true })}>{point.dangerRadius}</div> :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input className={`point__input-text ${this.state.validDistance ? 'valid' : 'valid_fail'}`}
                       placeholder="new Name" type="text" value={this.state.dangerRadius}
                       onChange={(e) => {
                         let valid;
                         valid = !(e.target.value < 0 || isNaN(Number(e.target.value)));
                         this.setState({ validDistance: valid, dangerRadius: e.target.value });
                       }}
                       onKeyDown={e => {
                         if (e.keyCode === 13) {
                           this.updatePoint();
                         }
                       }}
                       onBlur={() => {
                         this.updatePoint();
                       }}
                       autoFocus={true}
                />
              </div>
            }
            <div className={type === 'place' ? 'point__data-type-place' : 'point__data-type-danger'}/>
            <div onClick={() => this.updatePoint()}>
              {type === 'place' ?
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Wind Rose Chart" key="1"><WindRoseChart point={point}/></Tabs.TabPane>
                  <Tabs.TabPane tab="Statistics info" key="2"><Stats point={point}/></Tabs.TabPane>
                </Tabs> :
                <WindRoseChart point={point}/>
              }
            </div>
            <div className="point__data-text">Lat: {point.lat}</div>
            <div className="point__data-text">Lng: {point.lng}</div>
            <button className="point__data-btn-close" onClick={() => {
              this.props.updateReduxState({ info: { point: null, type: null } });
            }}/>
          </div>
          <div>
            <div className="point__data-buttons">
              <button
                className="point__data-btn-meta point__data-btn-meta--marker"
                onClick={this.goToMarker}>Go to marker
              </button>
              <button className="point__data-btn-meta point__data-btn-meta--remove" onClick={() => {
                this.delAlert();
              }}>Remove point
              </button>
            </div>
          </div>
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