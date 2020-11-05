const authorization = (req, res, next) => {
	const { role } = req.usuario;
	if (role !== 'admin') {
		res.status(401).json('No tienes suficientes permisos para acceder');
	} else {
		next();
	}
};
module.exports = authorization;
