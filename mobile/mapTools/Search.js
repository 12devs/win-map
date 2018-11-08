import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions, Keyboard, Modal } from 'react-native';
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
    if (selectedItems.length > 1) {
      return services.search(selectedItems).then(res => {
        const places = res.data.map((el, id) => {
          const { display_name, lat, lon } = el;
          return { id: id.toString(), display_name, lat, lon };
        });
        this.setState({ items: places });
      });
    }
    else {
      this.setState({ items: [] });
    }
  };

  onSelectedItemsChange = selectedItems => {
    console.log(this.state.items);
    const { lat, lon } = this.state.items[selectedItems];
    const mapRegion = calcMapRegionOne({ lat, lon });
    if (mapRegion) {
      this.props.updateReduxState({ mapRegion });
      this.setState({ items: [] });
      Keyboard.dismiss();
    }

  };

  render() {
    const { items } = this.state;
    console.log(height);
    return (
      <View style={styles.searchContainer}>
        {items.length > 1 ? <SearchBar
            lightTheme
            clearIcon
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            containerStyle={{
              backgroundColor: '#eeeeee', borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            inputStyle={{ backgroundColor: '#fff', elevation: 5 }}
            placeholder='Type Here...'/> :
          <SearchBar
            lightTheme
            clearIcon
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            // onClear={}
            containerStyle={{
              backgroundColor: 'transparent', borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            inputStyle={{ backgroundColor: '#fff', elevation: 5 }}
            placeholder='Type Here...'/>}

        {items.length > 1 ?
          <ScrollView style={{height:height/1.5 ,backgroundColor: '#eeeeee'}}>
            {
              items.map((l, i) => (
                <ListItem
                  containerStyle={{ backgroundColor: '#fff', marginRight: width / 40, marginLeft: width / 40 }}
                  key={i}
                  title={l.display_name}
                  subtitle={`lat: ${l.lat}, lng: ${l.lon}`}
                  onPress={() => this.onSelectedItemsChange(i)}
                />
              ))
            }

          </ScrollView> : null}
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
    width,
    // width: width - 2 * (width * 0.1),
    // marginTop: height / 55,
    // marginRight: width * 0.1,
    // marginLeft: width * 0.1,
  },
});
