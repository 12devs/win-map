import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, BackHandler, Dimensions, Keyboard, Modal } from 'react-native';
import actions from '../../actions/index';
import { connect } from "react-redux";
import services from '../../services/index';
import { calcMapRegionOne } from '../../utils';
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.items) {
      this.setState({ items: [] });
      return true;
    }
    else
      return false;
  };

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
    return (
      <View style={styles.searchContainer}>
        {items.length > 1 ? <SearchBar
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            containerStyle={[{ backgroundColor: '#eeeeee' }, styles.containerStyle]}
            inputStyle={styles.inputStyle}
            placeholder='Type Here...'/> :
          <SearchBar
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            containerStyle={[{ backgroundColor: 'transparent' }, styles.containerStyle]}
            inputStyle={styles.inputStyle}
            placeholder='Search...'/>}

        {items.length > 1 ?
          <ScrollView style={styles.scrollContainer}>
            {
              items.map((l, i) => (
                <ListItem
                  containerStyle={styles.listContainer}
                  key={i}
                  title={l.display_name}
                  subtitle={`lat: ${l.lat}, lng: ${l.lon}`}
                  onPress={() => this.onSelectedItemsChange(i)}
                  rightIcon={{ name: '' }}
                  chevron={false}

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
    places: state.get('places'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(Search);

const styles = StyleSheet.create({
  searchContainer: {
    width,
  },
  containerStyle: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  inputStyle: {
    backgroundColor: '#fff',
    elevation: 5
  },
  scrollContainer: {
    height: height * 0.8,
    backgroundColor: '#eeeeee',
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  listContainer: {
    backgroundColor: '#fff',
    marginRight: width / 40,
    marginLeft: width / 40,
    borderBottomColor: '#eee',
    borderTopColor: '#eee'
  }
});
