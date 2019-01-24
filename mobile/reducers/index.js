import immutable from "immutable";
import geolib from 'geolib';
import _ from 'lodash';

const getCompassDirection = (from, to) => {
  return geolib.getCompassDirection(from, to).exact;
};

const getGeolibDirection = (dir) => {
  const ref = {
    North: 'N',
    West: 'W',
    East: 'E',
    South: 'S',
  };
  return (ref[dir] || dir)
};

const getStats = (places, dangers, stationsData) => {
  const stats = {};
  places.forEach(place => {
    stats[place.id] = dangers.map(danger => {
      const direction = getCompassDirection(danger, place);
      const distance = geolib.getDistanceSimple(danger, place);
      let currently = false;
      if (distance < danger.dangerRadius && direction === getGeolibDirection(stationsData[danger.station_id].current.dir)) {
        currently = true;
      }
      return {
        name: place.name,
        type: place.type,
        dangerName: danger.name,
        dangerId: danger.id,
        direction: direction,
        period: `${Math.round(stationsData[place.station_id].history[direction] * stationsData[place.station_id].period / 100)} / ${stationsData[place.station_id].period}`,
        currently,
      }
    })
  });
  return stats;
};

const reducer = function (state = immutable.Map(), action) {
  const keys = Object.keys(action.state || {});
  console.log(keys);
  switch (action.type) {
    case "SET_STATE":
      return immutable.fromJS(action.state);
    case "updateReduxState":
      let a;
      if (!('tempRegion' in action.state)) {
        a = state.update("mapRegion", () => immutable.fromJS(state.get('tempRegion')));
      } else {
        a = state
      }
      const updatedState =  immutable.fromJS(immutable.mergeWith((oldVal, newVal, key) => {
        return newVal;
      }, a, action.state));

      if (_.intersection(keys, ["places", "dangers", "stationsData"]).length) {
        return updatedState.update("statistic", () => immutable.fromJS(getStats(updatedState.get('places'), updatedState.get('dangers'), updatedState.get('stationsData'))));
      } else {
        return updatedState
      }
    case "updateStatistic":
      return state.update("statistic", () => immutable.fromJS(getStats(state.get('places'), state.get('dangers'), state.get('stationsData'))));
    case "log":
      return state.update("logs", (log) => {
        if (log) {
          return immutable.fromJS(log.push(action.state))
        } else {
          return immutable.fromJS([action.state])
        }
      });
  }
};

module.exports = reducer;
