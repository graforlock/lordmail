const Sequelize = require('sequelize');

const Templates = function(connection) { 
        return connection.define("template", {
                name: {
                    type: Sequelize.STRING,
                    unique: true
                },
                content: Sequelize.TEXT,
                schema: Sequelize.TEXT
            }
        )
};

module.exports = Templates;