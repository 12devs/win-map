import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeModules,
  LayoutAnimation, BackHandler,
} from 'react-native';
import actions from '../actions/index';
import { connect } from "react-redux";
import { ListItem } from 'react-native-elements';
import Accordion from './Accordion';

const { UIManager } = NativeModules;
const { width } = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class notificationSettings extends Component {
  constructor() {
    super();
    this.state = {
      touch: '',
    };
    this.onClickPlace = this.onClickPlace.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Map');
    return true;
  };

  onClickPlace(id) {
    const { touch } = this.state;

    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    });

   return this.setState({ touch: touch === id ? '' : id });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          {this.props.places.map((place, i) => {
            return (
              <View key={i}>
                <ListItem
                  underlayColor={'#363f57'}
                  onPress={() => this.onClickPlace(place.id)}
                  containerStyle={styles.itemListContainer}
                  title={place.name}
                  titleStyle={{ color: '#c3c3c3' }}
                  leftIcon={{ name: 'location-on', color: '#3D6DCC' }}
                  rightIcon={place.id === this.state.touch ? { name: 'expand-more' } : {}}/>
                <Accordion place={place} touch={this.state.touch}/>
              </View>);
          })}
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    notificationSettings: state.get('notificationSettings'),
    places: state.get('places'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(notificationSettings);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    elevation: 3
  },
  scrollViewContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textContainer: {
    textAlign: 'center',
    textAlignVertical: "center",
    color: '#525966',
    padding: 10,
  },
  itemListContainer: {
    backgroundColor: '#424c6a',
    borderBottomColor: '#959595',
    borderTopColor: '#d2d2d2',
  },
  button: {
    marginLeft: width / 3,
    marginRight: width / 3,
    marginTop: 30
  }
});
