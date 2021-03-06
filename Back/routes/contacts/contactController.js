const contactModel = require("../../models/contactModel");

const createContact = (data) => {
  return new Promise(async (res, rejc) => {
    if (
      !data.name ||
      !data.lastname ||
      !data.role ||
      !data.email ||
      !data.company ||
      !data.region ||
      !data.country ||
      !data.city ||
      !data.address ||
      !data.interest
    ) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let email = await contactModel.findOne({ where: { email: data.email } });
      if (!email) {
        contactModel
          .create(data)
          .then((contact) => {
            res(contact);
          })
          .catch((error) => {
            // rejc({
            //   status: 500,
            //   message:
            //     "Tenemos problemas en el servidor, por favor intente mas tarde",
            // });
            rejc(error);
          });
      } else {
        rejc({
          status: 400,
          message: "Este email ya esta registrado",
        });
      }
    }
  });
};

const deleteContact = (email) => {
  return new Promise((res, rejc) => {
    contactModel
      .destroy({ where: { email: email } })
      .then((response) => {
        if (response === 1) {
          res("Contacto eliminado");
        } else {
          rejc({
            status: 404,
            message: "Contacto no encontrado, por favor verifique",
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

const updateContact = (id, data) => {
  return new Promise((res, rejc) => {
    contactModel
      .update(data, { where: { id: id } })
      .then((response) => {
        if (response[0] === 1) {
          res("Contacto actualizado con exito");
        } else {
          rejc({
            status: 404,
            message: "Datos no encontrados, no se pudo actualizar el contacto.",
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
  createContact,
  deleteContact,
  findById,
  updateContact,
};
