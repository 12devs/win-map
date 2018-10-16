import { Map } from "immutable";

const reducer = function (state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "addPoint":
      return state.update("points", (points) => points.push(action.point));
  }
  return state;
};

module.exports = reducer;
