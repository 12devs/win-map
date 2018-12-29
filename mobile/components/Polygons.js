import React from 'react';
import _ from 'lodash';
import { Polygon } from 'react-native-maps';
import { getPolygon } from '../utils/utils';
import { View } from "react-native";


const getPolygons = (dangers, stationsData, scaleWind, viewType) => {
  console.log('getPolygons', viewType);
  try {
    if (viewType==='Current') {
      return null
    }
    return dangers.map(danger => {
      const direction = _.get(stationsData, [danger.station_id, 'current', 'dir'], null);
      const positions = getPolygon(danger, 50000, direction, 11.25);
      console.log(positions);
      return (
        <View>
          <Polygon
            // lineCap={'round'}
            coordinates={positions}
            strokeWidth={1}
            strokeColor={'rgba(95, 87, 202, 0.7)'}
            fillColor={'rgba(95, 87, 202, 0.5)'}
          />
        </View>
      )
    });
  } catch (err){
    console.log(err);
    return null
  }
}

export {
  getPolygons
}
