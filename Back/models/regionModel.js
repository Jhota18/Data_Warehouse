const { DataTypes } = require('sequelize');
const sequelize = require('../DB');

const regionModel = sequelize.define(
  'regions',
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



module.exports = regionModel;