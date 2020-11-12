const regionModel = require("../../models/regionModel");

const createRegion = (data) => {
  return new Promise(async (res, rejc) => {
    if (!data.name) {
      rejc({ status: 406, message: "Por favor llene todos los campos" });
    } else {
      let name = await regionModel.findOne({ where: { name: data.name } });
      if (!name) {
        regionModel
          .create(data)
          .then((region) => {
            res(region);
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

const deleteRegion = (id) => {
  return new Promise((res, rejc) => {
    regionModel
      .destroy({ where: { id: id } })
      .then((response) => {
        if (response === 1) {
          res("Region eliminada");
        } else {
          rejc({
            status: 404,
            message: "Region no encontrada, por favor verifique",
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

const updateRegion = (id, data) => {
  return new Promise((res, rejc) => {
    if (data.name !== undefined) {
      regionModel
        .update(data, { where: { id: id } })
        .then((response) => {
          if (response[0] === 1) {
            res("Region actualizada con exito");
          } else {
            rejc({
              status: 404,
              message: "Datos no encontrados, no se pudo actualizar la región.",
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
        message: "Por favor indique region a eliminar",
      });
    }
  });
};

module.exports = {
  createRegion,
  deleteRegion,
  updateRegion,
};
