const express = require("express");
const contactModel = require("../../models/contactModel");
const router = express.Router();
const authentication = require("../../middlewares/authentication");
const authorization = require("../../middlewares/authorization");

const {
  createContact,
  deleteContact,
  updateContact,
} = require("./contactController");
// const { response } = require("express");

router.post("/create", (req, res) => {
  const contact = req.body;
  createContact(contact)
    .then((contact) => {
      res.status(200).json(contact);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.get("/list", (req, res) => {
  contactModel
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
