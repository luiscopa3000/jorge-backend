const { DataTypes } = require("sequelize");
const sequelize = require('../database/postgres');

const User = sequelize.define('users', {
    ci: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    pin_rec: {
        type: DataTypes.STRING
    },
    vence: {
        type: DataTypes.DATE
    }
});

module.exports = User;