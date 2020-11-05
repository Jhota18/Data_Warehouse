const express = require("express");
const router = express.Router();

const { signUp, login } = require("../controllers/userController");


router.post("/signup",(req, res) => {
    signUp(req, res);
  }
);

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;