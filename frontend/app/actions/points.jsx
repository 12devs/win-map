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

const updateStationsData = function (value) {
  return {
    type: "updateStationData",
    value
  }
};

const updateStations = function (value) {
  return {
    type: "updateStations",
    value
  }
};

const setMainData = function (state) {
  return {
    type: "SET_STATE",
    state,
  }
};

const updateMainData = function (value) {
  return {
    type: "updateMainData",
    value,
  }
};

module.exports = {
  addPoint,
  setMainData,
  updatePoints,
  updateStationsData,
  updateStations,
  updateMainData,
};
