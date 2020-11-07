const express = require("express");
const router = express.Router();

const { createUser, login } = require("./userController");


router.post("/signup",(req, res) => {
  const reqUser = req.body;
  createUser(reqUser).then((user) => {
    res.status(200).json(user);
  })
  .catch((error) => {
    res.status(error.status).json(error.message);
  });
  }
);

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;