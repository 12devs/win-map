import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import services from '../services/index';
import { calcMapRegionOne } from '../utils';
import { SearchBar, ListItem } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class Search extends Component {
  constructor() {
    super();
    this.state = {
      onSearch: false,
      items: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);
  }

  onChange = selectedItems => {
    console.log(selectedItems);
    const places = [];
    if (selectedItems.length > 1) {
      return services.search(selectedItems).then(res => {
        res.data.forEach((el, id) => {
          const { display_name, lat, lon } = el;
          places.push({ id: id.toString(), display_name, lat, lon });
        });
        this.setState({ items: places });
        console.log(this.state.items);
      });
    }
    else {
      this.setState({ items: [] });
    }
  };

  onSelectedItemsChange = selectedItems => {
    console.log(selectedItems);
    const { lat, lon } = this.state.items[selectedItems];
    const mapRegion = calcMapRegionOne({ lat, lon });
    if (mapRegion) {
      this.props.updateReduxState({ mapRegion });
      this.setState({ items: [] });
    }

  };

  render() {
    const { items } = this.state;

    return (
      <View style={styles.searchContainer}>
        <SearchBar
          showLoading
          clearIcon
          searchIcon={{ size: 24 }}
          onChangeText={this.onChange}
          // onClear={}
          placeholder='Type Here...'/>
        <View style={{ backgroundColor: 'white' }}>
          {
            items.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.display_name}
                subtitle={l.subtitle}
                onPress={() => this.onSelectedItemsChange(i)}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(Search);

const styles = StyleSheet.create({
  searchContainer: {
    width: width
  },
});
