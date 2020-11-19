const authorization = (req, res, next) => {
  const { rol } = req.usuario;
  if (rol !== "Administrador") {
    res.status(401).json("No tienes suficientes permisos para acceder");
  } else {
    next();
  }
};
module.exports = authorization;
