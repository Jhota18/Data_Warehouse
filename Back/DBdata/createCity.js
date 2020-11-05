const bcrypt = require("bcryptjs");
const City = require("../models/cityModel");

const createCity = async () => {
    try {
      const count = await City.estimatedDocumentCount();
  
      if (count > 0) return;
  
        const values = await Promise.all([
            new City({ name: "Indiana" }).save(),
            new City({ name: "Ciudad de Panamá" }).save(),
        ]);
  
      console.log(values);
  
      
      
    } catch (error) {
      console.error(error);
    }
  };
  
  
  createCity();
  
  module.exports = createCity;