const express = require("express");
const companyModel = require("../../models/companyModel");
const countryModel = require("../../models/countryModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");

const {
  createCompany,
  deleteCompany,
  updateCompany,
} = require("./companyController");
const { response } = require("express");

router.post("/create", (req, res) => {
  const reqCompany = req.body;
  createCompany(reqCompany)
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/list", (req, res) => {
  companyModel
    .findAll()
    .then((companies) => {
      res.status(200).json(companies);
    })
    .catch((err) => {
      res.status(500).json("Error interno, por favor intente mas tarde");
    });
});

router.delete("/delete", (req, res) => {
  let id = req.body.id;
  deleteCompany(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  companyModel
    .findOne({ where: { id: id } })
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

router.patch("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  updateCompany(id, data)
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;
