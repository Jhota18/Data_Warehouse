const jwt = require("jsonwebtoken");
const usersModel = require("../../models/userModel");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const createUser = (data) => {
  return new Promise(async (res, rejc) => {
    if (
      !data.name ||
      !data.lastname ||
      !data.email ||
      !data.password ||
      !data.rol
    ) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let email = await usersModel.findOne({ where: { email: data.email } });
      if (!email) {
        bcrypt.hash(data.password, 10, (err, hash) => {
          if (err) {
            rejc({
              status: 500,
              message:
                "Tenemos problemas en el servidor, por favor intente mas tarde",
            });
          } else {
            data.password = hash;
            usersModel
              .create(data)
              .then((user) => {
                res(user);
              })
              .catch((error) => {
                rejc({
                  status: 500,
                  message:
                    "Tenemos problemas en el servidor, por favor intente mas tarde",
                });
              });
          }
        });
      } else {
        rejc({ status: 400, message: "Este email ya esta registrado" });
      }
    }
  });
};

const login = (email, password) => {
  return new Promise(async (res, rejc) => {
    if (!email || !password) {
      rejc({ status: 406, message: "Faltan campos, por favor envielos" });
    } else {
      let user = await usersModel.findOne({ where: { email: email } });
      let comparePassword = bcrypt.compare(password, user.password);

      if (user && comparePassword) {
        delete user.password;
        res(jwt.sign(user, process.env.S));
      } else {
        rejc({ status: 401, message: `Usuario o contraseña no validos` });
      }
    }
  });
};

const getUsers = () => {};
module.exports = {
  createUser,
  login,
};
