const Sequelize = require('sequelize');

//const connection = require('../database/db');

module.exports = (sequelize, Sequelize) =>{
    const Hospitais = sequelize.define(
        'hospitais',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING
            },
            descricao: {
                type: Sequelize.STRING
            }
        },
        {
            timestamps: false
        }
    )
    return Hospitais;
}