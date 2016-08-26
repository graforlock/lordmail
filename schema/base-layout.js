const Sequelize = require('sequelize');

const Layout = function(connection) { 
        return connection.define("base-layout", 
            {
                uid: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true 
                },            
                html: Sequelize.TEXT
            },
            {
                    timestamps: false,
                    freezeTableName: true
            }
        )
};

module.exports = Layout;