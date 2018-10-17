const addPoint = function (point) {
  return {
    type: "addPoint",
    point
  }
};

const updatePoints = function (point) {
  return {
    type: "updatePoints",
    point
  }
};

const setMainData = function (state) {
  return {
    type: "SET_STATE",
    state
  }
};

module.exports = {
  addPoint,
  setMainData,
  updatePoints,
};
