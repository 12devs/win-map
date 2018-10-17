import { Map } from "immutable";
import geolib from 'geolib';

const getStats = (points, stationsData) => {
  const places = points.filter(point => point.type = 'place');
  const dangers = points.filter(point => point.type = 'danger');
  return places.map(place => {
    return dangers.map(danger => {
      const direction = geolib.getBearing(danger, place).exact;
      return {
        id: place.id,
        name: place.name,
        dangerName: danger.name,
        period: stationsData[place.station_id].history[direction] * stationsData[place.station_id].period,
        currently: direction === stationsData[place.station_id].current.dir
      }
    })
  })
};

const reducer = function (state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "addPoint":
      return state.update("points", (points) => points.push(action.point));
    case "updatePoints":
      return state.update("points", () => action.value);
    case "changeMarkerType":
      return state.update("markerType", () => action.value);
    case "changeActionType":
      return state.update("actionType", () => action.value);
    case "changeViewType":
      return state.update("viewType", () => action.value);
    case "updateStatistic":
      return state.update("statistic", () => getStats(state.get('points').toJS(), state.get('stationsData').toJS()));
  }
  return state;
};

module.exports = reducer;
