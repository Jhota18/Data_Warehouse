const express = require("express");
const userModel = require("../../models/userModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");

const { createUser, login } = require("./userController");

router.post("/signup", (req, res) => {
  const reqUser = req.body;
  createUser(reqUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((jwt) => {
      res
        .status(200)
        .json(
          "Ingreso exitoso, el siguiente es su token de autorizacion: " + jwt
        );
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/list", (req, res) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

module.exports = router;
