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
  console.log(Object.keys(action.state|| {}));
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
      return immutable.fromJS(immutable.mergeWith((oldVal, newVal, key) => {
        return newVal;
      }, a, action.state));
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
