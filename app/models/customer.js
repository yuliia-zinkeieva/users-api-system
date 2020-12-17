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

        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        image_id: {
            type: Sequelize.STRING,
            unique: true,
        }
    });

    return Customer;

};