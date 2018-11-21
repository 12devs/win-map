import React, { Component } from 'react';
import { View } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import MultiSelect from 'react-native-multiple-select';
import _ from 'lodash';

class MultiSelectExample extends Component {

  onSelectedItemsChange = selectedItems => {
    const { place } = this.props;
    const notificationSettings = this.props.notificationSettings;
    const index = _.findIndex(notificationSettings, o => (o.place.value == place.id));
    if (index === -1) {
      notificationSettings.push({
        place: {
          value: place.id
        },
        danger: selectedItems.map(elem => ({ value: elem }))
      })
    } else {
      notificationSettings[index] = {
        place: {
          value: place.id
        },
        danger: selectedItems.map(elem => ({ value: elem }))
      }
    }
    this.props.updateReduxState({ notificationSettings });
    this.forceUpdate()
  };

  render() {
    const { place } = this.props;
    let selectedItems = (this.props.notificationSettings.filter(elem => {
      return elem.place.value == place.id
    })[0] || {}).danger;
    if (!selectedItems) {
      selectedItems = []
    } else {
      selectedItems = selectedItems.map(elem => elem.value);
    }
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <MultiSelect
          items={this.props.dangers.map(elem => ({ value: elem.id, label: elem.name }))}
          uniqueKey="value"
          onSelectedItemsChange={this.onSelectedItemsChange}
          searchInputPlaceholderText=""
          selectedItems={selectedItems}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#3D6DCC"
          tagTextColor="#525966"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#CCC"
          displayKey="label"
          // submitButtonColor="#3D6DCC"
          // submitButtonText="Close"
          autoFocusInput={false}
          hideSubmitButton={true}
          // hideTags={true}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(MultiSelectExample);
