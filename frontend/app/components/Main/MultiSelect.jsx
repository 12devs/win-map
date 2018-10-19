import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (newValue) => {
    let points = this.props.notificationSettings.toJS();
    const point = points.find(x => x.place.value === this.props.point.id);

    if (point) {
      points = this.props.notificationSettings.toJS().filter(x => !(x.place.value === this.props.point.id));
    }

    points.push({
      place: {value: this.props.point.id, label: this.props.point.name},
      danger: newValue
    });
    this.props.updateNotificationSettings(points);
  };

  render() {
    const danger = this.props.dangers
      .map((point) => {
          return {value: point.get('id'), label: point.get('name')};
        }
      );

    return (
      <div>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          onChange={this.handleChange}
          isMulti
          options={danger}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dangers: state.get('dangers'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(MultiSelect);
