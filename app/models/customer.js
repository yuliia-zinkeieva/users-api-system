module.exports = function (sequelize, Sequelize) {
    const Customer = sequelize.define('Customer', {
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },

        email: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
    });

    return Customer;

};