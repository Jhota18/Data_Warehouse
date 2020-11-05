const { Schema, model } = require("mongoose");


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



module.exports = model("Country", countryModel);