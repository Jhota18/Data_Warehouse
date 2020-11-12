const { DataTypes } = require("sequelize");
const sequelize = require("../DB");
const regionModel = require("./regionModel");

const countryModel = sequelize.define(
  "countries",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

regionModel.hasMany(countryModel);
countryModel.belongsTo(regionModel);

module.exports = countryModel;
