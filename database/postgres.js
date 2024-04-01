const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ORBC', 'postgres', '123456', {
    host: '127.0.0.1',
    port: '5432',
    dialect: 'postgres',
    define: {
        timestamps: false, // Esto evita que Sequelize agregue 'created_at' y 'updated_at' automáticamente
    },
    logging: false,
});
//Correccion de errores
module.exports = sequelize;
