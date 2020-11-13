const express = require("express");
const countryModel = require("../../models/countryModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");
const {
  createCountry,
  deleteCountry,
  updateCountry,
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

router.get("/list", (req, res) => {
  regionModel
    .findAll()
    .then((regions) => {
      res.status(200).json(regions);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  deleteRegion(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  regionModel
    .findOne({ where: { id: id } })
    .then((region) => {
      res.status(200).json(region);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.patch("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  updateRegion(id, data)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
