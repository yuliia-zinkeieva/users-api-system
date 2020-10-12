const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../users-data.sqlite3'),
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  const model = db[modelName];

  if ('associate' in model) {
    db[modelName].associate(db);
  }

  const { classMethods, instanceMethods } = model.options;

  if (classMethods) {
    Object.assign(model, classMethods);
  }

  if (instanceMethods) {
    Object.assign(model.prototype, instanceMethods);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;