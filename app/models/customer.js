module.exports = function (sequelize, Sequelize) {
  const Customer = sequelize.define('Customer', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    lastname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      // validate: {
      //     isEmail: true
      // }
    },
  });

  return Customer;

};