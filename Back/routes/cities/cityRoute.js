const express = require("express");
const countryModel = require("../../models/countryModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const {
  createCity,
  deleteCity,
  updateCity,
  getCities,
} = require("./cityController");

router.post("/create", authentication, (req, res) => {
  const reqCity = req.body;
  createCity(reqCity)
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/:countryId/cityList", authentication, (req, res) => {
  let { countryId } = req.params;
  getCities(countryId)
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.get("/:cityId", authentication, (req, res) => {
  let city = req.params;
  countryModel
    .findOne({ where: { id: city } })
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.delete("/delete/:id", authentication, (req, res) => {
  let id = req.params.id;
  deleteCity(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.patch("/update/:id", authentication, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  updateCity(id, data)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
