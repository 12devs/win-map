const changeMarkerType = function (value) {
  return {
    type: "changeMarkerType",
    value
  }
};

const changeActionType = function (value) {
  return {
    type: "changeActionType",
    value
  }
};

const changeViewType = function (value) {
  return {
    type: "changeViewType",
    value
  }
};

module.exports = {
  changeMarkerType,
  changeActionType,
  changeViewType,
};
