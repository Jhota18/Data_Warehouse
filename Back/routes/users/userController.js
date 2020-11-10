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

const deleteUser = (email) => {
  return new Promise((res, rejc) => {
    usersModel
      .destroy({ where: { email: email } })
      .then((response) => {
        if (response === 1) {
          res("Usuario eliminado");
        } else {
          rejc({
            status: 404,
            message: "Usuario no encontrado, por favor verifique",
          });
        }
      })
      .then((error) => {
        rejc({
          status: 500,
          message: "Poseemos problemas, por favor intenta mas tarde",
        });
      });
  });
};

const findByEmail = (req, res) => {
  let email = req.params.email;
  usersModel.findOne({ where: { email: email } }).then((user) => {
    if (user !== null) {
      res.status(200).json(user);
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  });
};

const updateP = (email, data) => {
  return new Promise((res, rejc) => {
    usersModel
      .update(data, { where: { email: email } })
      .then((response) => {
        if (response[0] === 1) {
          res("Usuario actualizado con exito");
        } else {
          rejc({
            status: 404,
            message: "Datos no encontrados, no se pudo actualizar el usuario.",
          });
        }
      })
      .catch((error) => {
        rejc({
          status: 500,
          message: "Error interno, por favor intente  mas tarde.",
        });
      });
  });
};
module.exports = {
  createUser,
  login,
  deleteUser,
  findByEmail,
  updateP,
};
