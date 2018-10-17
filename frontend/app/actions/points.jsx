const addPoint = function (point) {
  return {
    type: "addPoint",
    point
  }
};

const updatePoints = function (value) {
  return {
    type: "updatePoints",
    value
  }
};

const setMainData = function (state) {
  return {
    type: "SET_STATE",
    state,
  }
};

module.exports = {
  addPoint,
  setMainData,
  updatePoints,
};
