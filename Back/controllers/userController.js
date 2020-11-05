const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const signUp = async (req, res) => {
  const { username, email, password, password_confirm, role } = req.body;

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist){
    res.status(400).json({ message: "El email, ya se encuentra registrado" });
  }

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    password_confirm: await User.encryptPassword(password_confirm),
    rol
  });

  const savedUser = await newUser.save();
  console.log(savedUser);

  res.status(200).json('Usuario creado exitosamente');
};

const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email});
  if (!userFound) return res.status(400).json({ message: "Usuario no registrado" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Contraseña invalida" });

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });

  console.log(userFound);
  res.json({ token });
};

module.exports = { signUp, login };