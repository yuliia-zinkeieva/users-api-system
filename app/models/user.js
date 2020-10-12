const bCrypt = require('bcrypt-nodejs');
const _ = require('lodash');

const hash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = (sequelize, Sequelize) => sequelize.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  email: {
    // todo: add unique
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', hash(value));
    },
  },
}, {
  instanceMethods: {
    toPublicJSON() {
      return _.omit(this.get(), ['password', 'createdAt', 'updatedAt']);
    },
  },
});