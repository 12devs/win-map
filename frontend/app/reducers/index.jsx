import immutable from "immutable";
import geolib from 'geolib';
import _ from 'lodash';

const getCompassDirection = (from, to) => {
  return geolib.getCompassDirection(from, to).exact;
};

const getStats = (places, dangers, stationsData) => {
  const stats = {};
  places.forEach(place => {
    stats[place.id] = dangers.map(danger => {
      const direction = getCompassDirection(danger, place);
      return {
        name: place.name,
        type: place.type,
        dangerName: danger.name,
        dangerId: danger.id,
        direction: direction,
        period: `${Math.round(stationsData[place.station_id].history[direction] * stationsData[place.station_id].period / 100)} / ${stationsData[place.station_id].period}`,
        currently: direction === stationsData[danger.station_id].current.dir
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
      const updatedState = immutable.fromJS(immutable.mergeWith((oldVal, newVal, key) => {
        return newVal;
      }, state, action.state));
      if (_.intersection(keys, ["places", "dangers", "stationsData"]).length) {
        return updatedState.update("statistic", () => immutable.fromJS(getStats(updatedState.get('places'), updatedState.get('dangers'), updatedState.get('stationsData'))));
      } else {
        return updatedState
      }
    case "updateStatistic":
      return state.update("statistic", () => immutable.fromJS(getStats(state.get('places'), state.get('dangers'), state.get('stationsData'))));
  }
};

module.exports = reducer;
