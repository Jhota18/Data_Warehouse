const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const cityModel = new Schema(
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



module.exports = model("City", cityModel);