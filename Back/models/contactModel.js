const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const contactModel = new Schema(
  {
    img: {
        type: String,
        required: true,
    },  
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    region: {
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
    interest: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



module.exports = model("Contact", contactModel);