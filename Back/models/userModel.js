const { DataTypes} = require('sequelize');
const sequelize = require('../DB');
const bcrypt = require("bcryptjs");


const userModel = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
			allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
			allowNull: false,
    },
  },
  {
    timestamps: true
    // hooks: {
    //   beforeCreate: function (user) {
    //     password = user.password;
    //     console.log(password);
    //     encryptPassword(password);
    //   }
    // }
  }
);



comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};


// userModel.addHook(async (user, options)=>{
//   password = user.password;
//   encryptPassword(password);
// })
module.exports = userModel;
