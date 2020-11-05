const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const countryModel = new Schema(
  {
      
    name: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



module.exports = model("City", countryModel);