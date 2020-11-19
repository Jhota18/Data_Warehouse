const express = require("express");
const userModel = require("../../models/userModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");

const { createUser, login, deleteUser, updateP } = require("./userController");
const { response } = require("express");

router.post("/signup", authentication, authorization, (req, res) => {
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
      res.status(200).json(jwt);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/list", authentication, authorization, (req, res) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.delete("/delete", authentication, authorization, (req, res) => {
  let email = req.body.email;
  deleteUser(email)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.get("/user/:email", authentication, authorization, (req, res) => {
  // findByEmail(req, res);
  let email = req.params.email;
  userModel
    .findOne({ where: { email: email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.patch("/update/:id", authentication, authorization, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  updateP(id, data)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
