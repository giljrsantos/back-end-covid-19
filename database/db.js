const Sequelize = require('sequelize');
const db = {}

const sequelizeDB = new Sequelize('appdevweb2', 'root', '123456', {
    hostname: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelizeDB;
db.Sequelize = Sequelize;

module.exports = db;

db.pacientes = require('../models/pacientes')(sequelizeDB, Sequelize);
db.hospitais = require('../models/hospitais')(sequelizeDB, Sequelize);

module.exports = db;

// const Sequelize = require("sequelize");
// const connection = new Sequelize('appdevweb2', 'root', '123456', {
//     host: 'localhost',
//     dialect: 'mysql'
//     //timezone: "-03:00"
// });

// module.exports = connection;
