const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new User({ name: "Jhonatan", lastname: "Gomez", email:"jhonatan@correo.com", password: await User.encryptPassword("123456"), rol: "admin" }).save(),
      new User({ name: "Valeria", lastname: "Alzate", email:"valeria@correo.com", password: await User.encryptPassword("000000"), rol: "user" }).save(),
    ]);

    console.log(values);

    
    
  } catch (error) {
    console.error(error);
  }
};


createUser();

module.exports = createUser;