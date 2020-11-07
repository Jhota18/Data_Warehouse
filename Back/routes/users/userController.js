const jwt = require('jsonwebtoken');
const usersModel = require('../../models/userModel');
const {Op} = require('sequelize');

const createUser = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.lastname || !data.email || !data.password || !data.rol) {
			rejc({ status: 406, message: 'Por favor llene todos los campos' });
		} else {
			usersModel
				.create(data)
				.then((user) => {
					res(user);
				})
				.catch((error) => {
					console.log(error);
					if (error.fields.email) {
						rejc({ status: 400, message: 'Este email ya esta registrado' });
					} else {
						rejc({ status: 500, message: 'Tenemos problemas en el servidor, por favor intente mas tarde' });
					}
				});
		}
	});
};

const login = (received_email, received_password) => {
	return new Promise(async (res, rejc) => {
		if (!received_email || !received_password) {
			rejc({ status: 406, message: 'Faltan campos, por favor envielos' });
		} else {
			let user = await usersModel.findOne(
				{where: {[Op.and]:[{email: received_email}, {password: received_password}]}}
			);
			if (user) {
					delete user.password;
					res(jwt.sign(user, process.env.S));

			} else {
				rejc({ status: 401, message: `Usuario o contraseña no validos` });
			}
		}
	});
};

module.exports = {
	createUser,
	login,
};

