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

router.post("/create", (req, res) => {
  const reqCity = req.body;
  createCity(reqCity)
    .then((city) => {
      res.status(200).json(city);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/:countryId/cityList", (req, res) => {
  let { countryId } = req.params;
  getCities(countryId)
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.get("/:countryId", (req, res) => {
  let country = req.params;
  countryModel
    .findOne({ where: { id: country } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  deleteCountry(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.patch("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  updateCountry(id, data)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
