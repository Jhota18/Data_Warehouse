const express = require("express");
const countryModel = require("../../models/countryModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const {
  createCountry,
  deleteCountry,
  updateCountry,
  getCountries,
} = require("./countryController");

router.post("/create", (req, res) => {
  const reqCountry = req.body;
  createCountry(reqCountry)
    .then((country) => {
      res.status(200).json(country);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/:regionId/countryList", (req, res) => {
  let { regionId } = req.params;
  getCountries(regionId)
    .then((countries) => {
      res.status(200).json(countries);
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
