const { DataTypes } = require('sequelize');
const sequelize = require('../DB');

const cityModel = sequelize.define(
  'cities',
  {
      
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);



module.exports = cityModel;