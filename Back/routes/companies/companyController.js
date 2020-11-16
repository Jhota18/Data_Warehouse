const companyModel = require("../../models/companyModel");

const createCompany = (data) => {
  return new Promise(async (res, rejc) => {
    if (
      !data.name ||
      !data.country ||
      !data.city ||
      !data.address ||
      !data.email ||
      !data.phone
    ) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let email = await companyModel.findOne({ where: { email: data.email } });
      let name = await companyModel.findOne({ where: { name: data.name } });
      if (!email && !name) {
        companyModel
          .create(data)
          .then((company) => {
            res(company);
          })
          .catch((error) => {
            rejc({
              status: 500,
              message:
                "Tenemos problemas en el servidor, por favor intente mas tarde",
            });
          });
      } else {
        rejc({
          status: 400,
          message: "Esta compañia o email ya estan registrados",
        });
      }
    }
  });
};

const deleteCompany = (id) => {
  return new Promise((res, rejc) => {
    companyModel
      .destroy({ where: { id: id } })
      .then((response) => {
        if (response === 1) {
          res("Compañia eliminada");
        } else {
          rejc({
            status: 404,
            message: "Compañia no encontrada, por favor verifique",
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

const findById = (req, res) => {
  let id = req.params.id;
  usersModel.findOne({ where: { id: id } }).then((company) => {
    if (company !== null) {
      res.status(200).json(company);
    } else {
      res.status(404).json("Compañia no encontrada");
    }
  });
};

const updateCompany = (id, data) => {
  return new Promise((res, rejc) => {
    companyModel
      .update(data, { where: { id: id } })
      .then((response) => {
        if (response[0] === 1) {
          res("Compañia actualizada con exito");
        } else {
          rejc({
            status: 404,
            message: "Datos no encontrados, no se pudo actualizar la compañia.",
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
  createCompany,
  deleteCompany,
  findById,
  updateCompany,
};
