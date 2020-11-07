const { DataTypes } = require('sequelize');
const sequelize = require('../DB');


const countryModel = sequelize.define(
  'countries',
  {
      
    name: {
      type: DataTypes.STRING(50),
			allowNull: false,
    }
  },
  {
    timestamps: true
  }
);



module.exports = countryModel;