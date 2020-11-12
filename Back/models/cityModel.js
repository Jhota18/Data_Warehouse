const { DataTypes } = require("sequelize");
const sequelize = require("../DB");
const countryModel = require("./countryModel");

const cityModel = sequelize.define(
  "cities",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

countryModel.hasMany(cityModel);
cityModel.belongsTo(countryModel);

module.exports = cityModel;
