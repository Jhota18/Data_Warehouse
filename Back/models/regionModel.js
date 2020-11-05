const { Schema, model } = require("mongoose");


const regionModel = new Schema(
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



module.exports = model("Region", regionModel);