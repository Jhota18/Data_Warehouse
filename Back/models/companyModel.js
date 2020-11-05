const { Schema, model } = require("mongoose");


const companyModel = new Schema(
  {
      
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    }
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



module.exports = model("Company", companyModel);