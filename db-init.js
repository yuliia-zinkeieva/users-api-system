const models = require('./app/models');

// Sync Database
models.sequelize.sync({ force: true }).then(function () {
  console.log('Nice! Database looks fine');
}).catch(function (err) {
  console.log(err, 'Something went wrong with the Database Update!');
});

