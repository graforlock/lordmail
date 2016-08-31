const Sequelize = require('sequelize');

const Rows = function(connection) { 
        return connection.define("rows", {
                name: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                description: {
                    type: Sequelize.STRING,
                    defaultValue: 'No description'
                },
                content: Sequelize.TEXT,
                type: {
                    type: Sequelize.STRING,
                    defaultValue: 'common'
                }
            }, 
            {
                timestamps: false
            }
        )
};

module.exports = Rows;