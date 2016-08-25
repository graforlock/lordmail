const Sequelize = require('sequelize');

const connection = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',
 
  // the storage engine for sqlite
  // - default ':memory:'
  storage: 'database.sqlite'
});

const Rows = connection.define("rows", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    content: Sequelize.STRING
});

connection.sync({
    logging: console.log
});