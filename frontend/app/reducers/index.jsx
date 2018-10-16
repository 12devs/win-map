import { Map } from "immutable";

const reducer = function (state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "addPoint":
      return state.update("points", (points) => points.push(action.point));
    case "changeMarkerType":
      return state.update("markerType", () => action.value);
    case "changeActionType":
      return state.update("actionType", () => action.value);
    case "changeViewType":
      return state.update("viewType", () => action.value);
  }
  return state;
};

module.exports = reducer;
