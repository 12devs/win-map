function addColumns(queryInterface, Sequelize, tableName, columns) {
  return Sequelize.Promise.map(
    Object.keys(columns),
    columnName => queryInterface.addColumn(tableName, columnName, columns[columnName])
  )
}

function removeColumns(queryInterface, Sequelize, tableName, columns) {
  return Sequelize.Promise.map(
    Object.keys(columns),
    columnName => queryInterface.removeColumn(tableName, columnName, columnName)
  )
}

function createTableUpDown(tableName, columns) {
  return {
    up: function (queryInterface) {
      return queryInterface.createTable(tableName, columns);
    },

    down: function (queryInterface) {
      return queryInterface.dropTable(tableName);
    },
  }
}

function deleteTable(tableName, columns) {
  return {
    up: function (queryInterface) {
      return queryInterface.dropTable(tableName);
    },

    down: function (queryInterface) {
      return queryInterface.createTable(tableName, columns);
    },
  }
}

function addIndex(tableName, columns) {
  return {
    up: function (queryInterface) {
      return queryInterface.addIndex(tableName, columns);
    },

    down: function (queryInterface) {
      return queryInterface.removeIndex(tableName);
    },
  }
}

function bulkInsertUpDown(tableName, items) {
  return {
    up(queryInterface) {
      if (!items.length) {
        return;
      }
      return queryInterface.bulkInsert(tableName, items);
    },
    down(queryInterface) {
      return queryInterface.bulkDelete(tableName, null, {});
    },
  }
}

function alterTableByColumnsUpDown(tableName, getColumnsFn) {
  return {
    up: function (queryInterface, Sequelize) {
      return addColumns(queryInterface, Sequelize, tableName, getColumnsFn(Sequelize));
    },

    down: function (queryInterface, Sequelize) {
      return removeColumns(queryInterface, Sequelize, tableName, getColumnsFn(Sequelize));
    },
  }
}

function transformToCollection(columns) {
  return Object.keys(columns).map(name => ({
    name,
    attributes: columns[name],
  }));
}

function stepByStep(steps) {
  return steps.reduce(
    (promise, step) => promise.then(() => step),
    Promise.resolve()
  )
}

module.exports = {
  addColumns,
  removeColumns,
  alterTableByColumnsUpDown,
  createTableUpDown,
  deleteTable,
  addIndex,
  bulkInsertUpDown,
  transformToCollection,
  stepByStep,
};
