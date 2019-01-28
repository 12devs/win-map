import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, BackHandler, Keyboard } from 'react-native'
import actions from '../../actions/index'
import { connect } from "react-redux"
import services from '../../services/index'
import { calcMapRegionOne } from '../../utils/utils'
import { SearchBar, ListItem } from 'react-native-elements'

class Search extends Component {
  constructor() {
    super()
    this.state = {
      onSearch: false,
      items: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
  }

  handleBackPress = () => {
    if (this.state.items) {
      this.setState({ items: [] })
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      return true
    }
    return false
  }

  onChange = selectedItems => {
    if (selectedItems.length > 1) {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      return services.search(selectedItems).then(res => {
        const places = res.data.map((el, id) => {
          const { display_name, lat, lon } = el
          return { id: id.toString(), display_name, lat, lon }
        })
        this.setState({ items: places })
      })
    }
    return this.setState({ items: [] })
  }

  onSelectedItemsChange = selectedItems => {
    const { lat, lon } = this.state.items[selectedItems]
    const mapRegion = calcMapRegionOne({ lat, lon })
    if (mapRegion) {
      this.props.updateReduxState({ mapRegion })
      this.setState({ items: [] })
      Keyboard.dismiss()
    }
  }

  render() {
    const { items } = this.state
    const { width, height } = this.props

    return (
      <View style={{ width }}>
        {items.length > 1 ? <SearchBar
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            containerStyle={[{ backgroundColor: '#eeeeee' }, styles.containerStyle]}
            inputStyle={styles.inputStyle}
            placeholder='Type Here...'/> :
          <SearchBar
            searchIcon={{ size: 24 }}
            onChangeText={this.onChange}
            containerStyle={[{ borderRadius: 50, backgroundColor: 'transparent' }, styles.containerStyle]}
            inputStyle={[styles.inputStyle, {borderRadius: 50}]}
            placeholder='Search...'/>}

        {items.length > 1 ?
          <ScrollView style={[{ height }, styles.scrollContainer]}>
            {
              items.map((l, i) => (
                <ListItem
                  containerStyle={[styles.listContainer, {
                    marginRight: width / 40,
                    marginLeft: width / 40,
                  }]}
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
    )
  }
}

export default connect(null, actions)(Search)

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  inputStyle: {
    backgroundColor: '#fff',
    elevation: 1
  },
  scrollContainer: {
    backgroundColor: '#eeeeee',
  },
  listContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderTopColor: '#eee'
  }
})
