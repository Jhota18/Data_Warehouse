const bcrypt = require("bcryptjs");
const Company = require("../models/companyModel");

const createCompany = async () => {
  try {
    const count = await Company.estimatedDocumentCount();

    if (count > 0) return;

      const values = await Promise.all([
          new Company({ name: "Facebook", country: "Colombia", city: "Medellin", address: "Cr 89 b 57-101", email: "facebook@correo.com", phone: "4193438" }).save(),
          new Company({ name: "Instagram", country: "EEUU", city: "New York", address: "av washington 15", email: "instagram@correo.com", phone: "12345668" }).save(),
      ]);

    console.log(values);

    
    
  } catch (error) {
    console.error(error);
  }
};


createCompany();

module.exports = createCompany;