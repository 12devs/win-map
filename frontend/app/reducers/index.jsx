import { Map, Set, List } from "immutable";
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

const reducer = function (state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "updatePoints":
      return state.update("points", () => immutable.fromJS(action.value));
    case "updateStationData":
      return state.update("stationsData", () => immutable.fromJS(action.value));
    case "updateStations":
      return state.update("stations", () => immutable.fromJS(action.value));
    case "changeMarkerType":
      return state.update("markerType", () => immutable.fromJS(action.value));
    case "changeActionType":
      return state.update("actionType", () => immutable.fromJS(action.value));
    case "changeViewType":
      return state.update("viewType", () => immutable.fromJS(action.value));
    case "updateStatistic":
      return state.update("statistic", () => immutable.fromJS(getStats(state.get('places').toJS(), state.get('dangers').toJS(), state.get('stationsData').toJS())));
    case "changeScaleWind":
      return state.update("scaleWind", () => immutable.fromJS(action.value));
    case "updateMainData":
      return state.update((state) => {
        const newState = state.toJS();
        if (action.value.dangers) {
          newState.dangers = action.value.dangers;
        }
        if (action.value.places) {
          newState.places = action.value.places;
        }
        if (action.value.stations) {
          newState.stations = action.value.stations;
        }
        if (action.value.stationsData) {
          newState.stationsData = action.value.stationsData;
        }
        newState.statistic = getStats(newState.places, newState.dangers, newState.stationsData);
        return immutable.fromJS(newState)
      });
  }
  return state;
};

module.exports = reducer;
