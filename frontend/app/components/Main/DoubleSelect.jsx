import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class DoubleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.pointHandleChange = this.pointHandleChange.bind(this);
    this.dangerHandleChange = this.dangerHandleChange.bind(this);
    this.delSetting = this.delSetting.bind(this);
  }

  pointHandleChange = (newValue) => {
    let points = this.props.notificationSettings.toJS();
    const point = points.find(x => x.arrId === this.props.point.arrId);
    console.log('point', point);
    if (point) {
      point.place = newValue;
      points = this.props.notificationSettings.toJS().filter(x => !(x.arrId === this.props.point.arrId));
      points.push(point);
      this.props.updateNotificationSettings(points);

    }
    else {
      points.push({arrId: this.props.point.arrId, place: newValue});
      this.props.updateNotificationSettings(points);
    }
  };

  dangerHandleChange = (newValue) => {
    let points = this.props.notificationSettings.toJS();
    const point = points.find(x => x.arrId === this.props.point.arrId);
    if (point) {
      point.danger = newValue;
      points = this.props.notificationSettings.toJS().filter(x => !(x.arrId === this.props.point.arrId));
      points.push(point);
      this.props.updateNotificationSettings(points);

    }
    else {
      points.push({arrId: this.props.point.arrId, danger: newValue});
      this.props.updateNotificationSettings(points);
    }
  };

  delSetting = () => {
    const points = this.props.notificationSettings.toJS().filter(x => !(x.arrId === this.props.point.arrId));
    this.props.updateNotificationSettings(points);
  };

  render() {
    const danger = this.props.points
      .filter(el => el.get('type') === 'Danger')
      .map((point) => {
          return {value: point.get('id'), label: point.get('name')};
        }
      );

    const place = this.props.points
      .filter(el => el.get('type') === 'My Place')
      .map((point) => {
          return {value: point.get('id'), label: point.get('name')};
        }
      );

    const place3 = place.filter(x => this.props.notificationSettings.toJS().findIndex(el => {
      if (el.place) {
        console.log(x.value);
        return el.place.value === x.value;
      }
      return false;
    }))

    console.log(place3.toJS());

    return (
      <div>
        <Select
          isClearable
          components={makeAnimated()}
          onChange={this.pointHandleChange}
          options={place3}
        />
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          onChange={this.dangerHandleChange}
          isMulti
          options={danger}
        />
        <button onClick={this.delSetting}>-</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    points: state.get('points'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(DoubleSelect);
