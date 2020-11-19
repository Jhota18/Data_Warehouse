const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  let authorization = req.headers.authorization;
  if (authorization) {
    let token = authorization.split(" ")[1];
    jwt.verify(token, process.env.S, (error, decoded) => {
      if (error) {
        res.status(400).json("Usuario no se pudo verificar");
      }
      req.usuario = decoded;
      next();
    });
  } else {
    res
      .status(401)
      .json(
        "Debes ingresar con tu usuario y contraseña para utilizar este servicio"
      );
  }
};

module.exports = authentication;
