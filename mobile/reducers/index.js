import immutable from "immutable";
import geolib from 'geolib';

const getCompassDirection = (from, to) => {
  const geolibGetCompassDirection = geolib.getCompassDirection(from, to).exact;
  switch (geolibGetCompassDirection) {
    case "N":
      return 'North';
    case "W":
      return 'West';
    case "E":
      return 'East';
    case "S":
      return 'South';
    default:
      return geolibGetCompassDirection
  }
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
  switch (action.type) {
    case "SET_STATE":
      return immutable.fromJS(action.state);
    case "updateReduxState":
      return immutable.fromJS(immutable.mergeWith((oldVal, newVal, key) => {
        return newVal;
      }, state, action.state));
    case "updateStatistic":
      return state.update("statistic", () => immutable.fromJS(getStats(state.get('places'), state.get('dangers'), state.get('stationsData'))));
  }
};

module.exports = reducer;