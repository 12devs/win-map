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
    let points = this.props.notificationSettings;
    const point = points.find(x => x.place.value === this.props.point.id);

    if (point) {
      points = this.props.notificationSettings.filter(x => !(x.place.value === this.props.point.id));
    }

    points.push({
      place: { value: this.props.point.id, label: this.props.point.name },
      danger: newValue
    });
    this.props.updateReduxState({notificationSettings: points});
  };

  render() {
    let defaultValue;
    const notificationSettings = this.props.notificationSettings;
    const index = notificationSettings.findIndex(elem => {
      return (elem.place.value === this.props.point.id)
    });
    if (index !== -1) {
      defaultValue = notificationSettings[index].danger;
    } else {
      defaultValue = []
    }
    const danger = this.props.dangers
      .map((point) => {
          return { value: point.id, label: point.name };
        }
      );

    return (
      <div>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          onChange={this.handleChange}
          defaultValue={defaultValue}
          placeholder={'Select some dangerous'}
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
