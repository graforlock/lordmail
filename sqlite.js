const Sequelize = require('sequelize');

const connection = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',
 
  // the storage engine for sqlite
  // - default ':memory:'
  storage: 'database.sqlite'
});

const Header = '';
const Footer = '';
const Options = '';

const Rows = connection.define("rows", {
        name: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        description: Sequelize.STRING,
        content: Sequelize.TEXT,
        type: {
            type: Sequelize.STRING,
            defaultValue: 'common'
        }
    }, 
    {
        timestamps: false
    }
);

connection.sync({
    logging: console.log
});