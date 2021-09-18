const { 
    Sequelize, 
    Model, 
    DataTypes 
} = require('sequelize');

export const sqlz = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/database/db.sqlite'
});

export const User = sqlz.define("user", {
    name: DataTypes.TEXT,
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    number: DataTypes.TEXT
});

export const EventTable = sqlz.define("event", {
    body: DataTypes.TEXT,
    title: DataTypes.INTEGER,
    hour: DataTypes.TEXT
}); 
