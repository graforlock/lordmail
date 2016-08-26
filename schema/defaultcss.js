const Sequelize = require('sequelize');

const DefaultCss = function(connection) { 
        return connection.define("defaultcss", 
            {
                uid: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true 
                },            
                css: Sequelize.TEXT
            },
            {
                    timestamps: false,
                    freezeTableName: true
            }
        )
};

module.exports = DefaultCss;