const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('datawarehouse', process.env.U, process.env.P,
{
    dialect: 'mysql',
    host: '127.0.0.1',
    define: {
		freezeTableName: true,
	},
	query: {
		raw: true,
	},
});

sequelize.authenticate().then(()=>{
    console.log('Conectado a la Base de Datos');
}).catch(err=>{
    console.error(err);
});

module.exports = sequelize;