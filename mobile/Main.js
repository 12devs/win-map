import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import actions from './actions';
import { connect } from "react-redux";
import Map from './Map';
import services from "./services";
import AddPoint from './AddPoint';
import PointSettings from './PointSettings';
import { calcMapRegionAll } from './utils';

const remote = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00OTcuOTEzLDQ5Ny45MTNjLTE4Ljc4MiwxOC43ODItNDkuMjI1LDE4Ljc4Mi02OC4wMDgsMGwtODQuODYyLTg0Ljg2M2MtMzQuODg5LDIyLjM4Mi03Ni4xMywzNS43MTctMTIwLjY1OSwzNS43MTcgIEMxMDAuNDY5LDQ0OC43NjcsMCwzNDguMzEyLDAsMjI0LjM4M1MxMDAuNDY5LDAsMjI0LjM4NCwwYzEyMy45MzEsMCwyMjQuMzg0LDEwMC40NTIsMjI0LjM4NCwyMjQuMzgzICBjMCw0NC41MTQtMTMuMzUyLDg1Ljc3MS0zNS43MTgsMTIwLjY3Nmw4NC44NjMsODQuODYzQzUxNi42OTUsNDQ4LjcwNCw1MTYuNjk1LDQ3OS4xMzEsNDk3LjkxMyw0OTcuOTEzeiBNMjI0LjM4NCw2NC4xMDkgIGMtODguNTExLDAtMTYwLjI3NCw3MS43NDctMTYwLjI3NCwxNjAuMjczYzAsODguNTI2LDcxLjc2NCwxNjAuMjc0LDE2MC4yNzQsMTYwLjI3NGM4OC41MjUsMCwxNjAuMjczLTcxLjc0OCwxNjAuMjczLTE2MC4yNzQgIEMzODQuNjU3LDEzNS44NTYsMzEyLjkwOSw2NC4xMDksMjI0LjM4NCw2NC4xMDl6Ii8+PC9zdmc+';


class Main extends Component {

  componentDidMount = () => {
    return services.getInfo()
      .then(res => {
        if (res.unauthorized) {
          return this.props.navigation.navigate('Login')
        }
        const mapRegion = calcMapRegionAll([...res.places, ...res.dangers]);
        if (mapRegion) {
          res.mapRegion = mapRegion
        }
        return this.props.updateReduxState(res)
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Map style={styles.map}/>
        <AddPoint/>
        <PointSettings/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    savePointSettings: state.get('savePointSettings'),
    dangers: state.get('dangers'),
    stations: state.get('stations'),
    stationsData: state.get('stationsData'),
    markerType: state.get('markerType'),
    viewType: state.get('viewType'),
    actionType: state.get('actionType'),
    isSavePointSettingsOpen: state.get('isSavePointSettingsOpen'),
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(Main);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {}
});
