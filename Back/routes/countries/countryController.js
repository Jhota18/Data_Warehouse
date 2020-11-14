const countryModel = require("../../models/countryModel");

const createCountry = (data) => {
  return new Promise(async (res, rejc) => {
    if (!data.name || !data.regionId) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let name = await countryModel.findOne({ where: { name: data.name } });
      if (!name) {
        countryModel
          .create(data)
          .then((country) => {
            res(country);
          })
          .catch((error) => {
            rejc({
              status: 500,
              message:
                "Tenemos problemas en el servidor, por favor intente mas tarde",
            });
          });
      } else {
        rejc({ status: 400, message: "Ya existe una región con este nombre" });
      }
    }
  });
};

const getCountries = (regionId) => {
  return new Promise((res, rejc) => {
    countryModel
      .findAll({ where: { regionId: regionId } })
      .then((response) => {
        res(response);
      })
      .catch((error) => {
        rejc({
          status: 500,
          message:
            "Tenemos problemas en el servidor, por favor intente mas tarde",
        });
      });
  });
};

const deleteCountry = (id) => {
  return new Promise((res, rejc) => {
    countryModel
      .destroy({ where: { id: id } })
      .then((response) => {
        if (response === 1) {
          res("País eliminado");
        } else {
          rejc({
            status: 404,
            message: "País no encontrado, por favor verifique",
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

const updateCountry = (id, data) => {
  return new Promise((res, rejc) => {
    if (data.name !== undefined) {
      countryModel
        .update(data, { where: { id: id } })
        .then((response) => {
          if (response[0] === 1) {
            res("País actualizado con exito");
          } else {
            rejc({
              status: 404,
              message: "Datos no encontrados, no se pudo actualizar el país.",
            });
          }
        })
        .catch((error) => {
          rejc({
            status: 500,
            message: "Error interno, por favor intente  mas tarde.",
          });
        });
    } else {
      rejc({
        status: 406,
        message: "Por favor indique país a eliminar",
      });
    }
  });
};

module.exports = {
  createCountry,
  getCountries,
  deleteCountry,
  updateCountry,
};
