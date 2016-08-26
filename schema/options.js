const Sequelize = require('sequelize');

const Options = function(connection) { 
        return connection.define("option", 
            {
                uid: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true 
                },
                type: {
                    type: Sequelize.STRING,
                    unique: true
                },
                html: Sequelize.TEXT
            },
            {
                    timestamps: false
            }
        )
};

module.exports = Options;