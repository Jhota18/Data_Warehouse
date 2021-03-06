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
  getAllCountries,
  getCountryById,
} = require("./countryController");

router.post("/create", authentication, (req, res) => {
  const reqCountry = req.body;
  createCountry(reqCountry)
    .then((country) => {
      res.status(200).json(country);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/:regionId/countryList", authentication, (req, res) => {
  let { regionId } = req.params;
  getCountries(regionId)
    .then((countries) => {
      res.status(200).json(countries);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.get("/list", authentication, (req, res) => {
  getAllCountries()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error.status).json({ message: error.message });
    });
});

router.get("/:countryId", authentication, (req, res) => {
  let country = req.params.countryId;
  getCountryById(country)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error.status).json({ message: error.message });
    });
});

router.delete("/delete/:id", authentication, (req, res) => {
  let id = req.params.id;
  deleteCountry(id)
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
  updateCountry(id, data)
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
