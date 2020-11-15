const cityModel = require("../../models/cityModel");

const createCity = (data) => {
  return new Promise(async (res, rejc) => {
    if (!data.name || !data.countryId) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let name = await cityModel.findOne({ where: { name: data.name } });
      if (!name) {
        cityModel
          .create(data)
          .then((city) => {
            res(city);
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

const getCities = (countryId) => {
  return new Promise((res, rejc) => {
    cityModel
      .findAll({ where: { countryId: countryId } })
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

const deleteCity = (id) => {
  return new Promise((res, rejc) => {
    cityModel
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

const updateCity = (id, data) => {
  return new Promise((res, rejc) => {
    if (data.name !== undefined) {
      cityModel
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
  createCity,
  getCities,
  deleteCity,
  updateCity,
};
