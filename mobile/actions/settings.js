const updateStatistic = function (value) {
  return {
    type: "updateStatistic",
    value
  }
};

const updateReduxState = function (state) {
  return {
    type: "updateReduxState",
    state
  }
};

module.exports = {
  updateStatistic,
  updateReduxState,
};
