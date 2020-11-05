const bcrypt = require("bcryptjs");
const Country = require("../models/countryModel");

const createCountry = async () => {
    try {
      const count = await Country.estimatedDocumentCount();
  
      if (count > 0) return;
  
        const values = await Promise.all([
            new Country({ name: "Estados Unidos" }).save(),
            new Country({ name: "Panamá" }).save(),
        ]);
  
      console.log(values);
  
      
      
    } catch (error) {
      console.error(error);
    }
  };
  
  
  createCountry();
  
  module.exports = createCountry;