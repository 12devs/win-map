import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class DoubleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.delSetting = this.delSetting.bind(this);
  }

  handleChange = (newValue, type) => {
    let points = this.props.notificationSettings.toJS();
    const point = points.find(x => x.arrId === this.props.point.arrId);
    if (point) {
      point[type] = newValue;
      points = this.props.notificationSettings.toJS().filter(x => !(x.arrId === this.props.point.arrId));
      points.push(point);
      this.props.updateNotificationSettings(points);

    }
    else {
      points.push({arrId: this.props.point.arrId, [type]: newValue});
      this.props.updateNotificationSettings(points);
    }
  };

  delSetting = () => {
    const points = this.props.notificationSettings.toJS().filter(x => !(x.arrId === this.props.point.arrId));
    this.props.updateNotificationSettings(points);
  };

  render() {
    const danger = this.props.dangers
      .map((point) => {
          return {value: point.get('id'), label: point.get('name')};
        }
      );

    const place = this.props.places
      .map((point) => {
          return {value: point.get('id'), label: point.get('name')};
        }
      );

    return (
      <div>
        <Select
          isClearable
          components={makeAnimated()}
          onChange={(e) => this.handleChange(e, 'place')}
          options={place}
        />
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          onChange={(e) => this.handleChange(e, 'danger')}
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
    places: state.get('places'),
    dangers: state.get('dangers'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(DoubleSelect);
