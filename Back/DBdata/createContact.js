const Contact = require("../models/contactModel");
const bcrypt = require("bcryptjs");

const createContact = async () => {
  try {
    const count = await Contact.estimatedDocumentCount();

    if (count > 0) return;

      const values = await Promise.all([
          new Contact({ img: "xxx.png", name: "Jhonatan", lastname: "Gomez", role: "developer", email: "jhonatan@correo.com", company: "Acamica", region: "Latam", country: "Colombia", city: "Medellin", address: "Cr 89 b 57-101", interest: "75%" }).save(),
          new Contact({ img: "xxx.png", name: "Valeria", lastname: "Gomez", role: "developer", email: "valeria@correo.com", company: "Acamica", region: "Latam", country: "Colombia", city: "Bogotá", address: "Cr 98 b 75-103", interest: "50%" }).save(),
      ]);

    console.log(values);

    
    
  } catch (error) {
    console.error(error);
  }
};


createContact();

module.exports = createContact;