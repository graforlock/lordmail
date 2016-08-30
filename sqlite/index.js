const Sequelize = require('sequelize');

const connection = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

module.exports = connection;