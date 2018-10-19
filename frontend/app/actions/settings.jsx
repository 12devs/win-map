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

const updateStatistic = function (value) {
  return {
    type: "updateStatistic",
    value
  }
};

const updateNotificationSettings = function (value) {
  return {
    type: "updateNotificationSettings",
    value
  }
};


const changeScaleWind = function (value) {
  return {
    type: "changeScaleWind",
    value
  }
};

module.exports = {
  changeMarkerType,
  changeActionType,
  changeViewType,
  updateStatistic,
  updateNotificationSettings,
  changeScaleWind
};
