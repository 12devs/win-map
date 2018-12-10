import React, { Component } from 'react';
import { View } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import _ from 'lodash';
import { List, ListItem } from 'react-native-elements';

class Accordion extends Component {
  state = {
    items: []
  };


  onSelectedItemsChange = (l) => {
    const { place } = this.props;
    const notificationSettings = this.props.notificationSettings;
    const index = _.findIndex(notificationSettings, o => (o.place.value === place.id));
    if (index === -1) {
      notificationSettings.push({
        place: {
          label: place.name,
          value: place.id
        },
        danger: [{ value: l.id, label: l.name }]
      });
    } else {
      let danger = notificationSettings[index].danger;
      const value = _.findIndex(danger, el => (el.value === l.id));
      if (value !== -1) {
        danger = danger.filter(el => el.value !== l.id);
      }
      else {
        danger.push({ value: l.id, label: l.name });
      }
      notificationSettings[index] = {
        place: {
          label: place.name,
          value: place.id
        },
        danger
      };
    }
    this.props.updateReduxState({ notificationSettings });
    this.forceUpdate();
  };


  render() {
    const { place, dangers } = this.props;

    let selectedItems = (this.props.notificationSettings.filter(elem => {
      return elem.place.value === place.id;
    })[0] || {}).danger;

    if (!selectedItems) {
      selectedItems = [];
    }
    else console.log('selectedIItems', selectedItems);

    // this.setState({ items: selectedItems });
    // console.log(selectedItems);
    return (
      <View style={{ flex: 1 }}>
        {this.props.touch === place.id ?
          <View>
            {
              dangers.map((l) => (
                <ListItem
                  onPress={() => {
                    this.onSelectedItemsChange(l);
                  }}
                  containerStyle={{
                    borderBottomColor: '#eee',
                    // marginTop: 5,
                    marginBottom: 2,
                    borderTopColor: 'transparent',
                    marginLeft: 10,
                    marginRight: 10
                  }}
                  key={l.id}
                  title={l.name}
                  leftIcon={{ name: 'location-on', color: 'red' }}
                  rightIcon={selectedItems.find(el => (el.value === l.id)) ? { name: 'done' } : { name: 'close' }}
                />
              ))
            }
          </View> : null}
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

export default connect(mapStateToProps, actions)(Accordion);
