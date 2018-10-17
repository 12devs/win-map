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

const setMainData = function (value) {
  return {
    type: "updateMainData",
    value,
  }
};

module.exports = {
  addPoint,
  setMainData,
  updatePoints,
};
