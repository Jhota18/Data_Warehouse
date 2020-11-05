const bcrypt = require("bcryptjs");
const Region = require("../models/regionModel");

const createRegion = async () => {
  try {
    const count = await Region.estimatedDocumentCount();

    if (count > 0) return;

      const values = await Promise.all([
          new Region({ name: "Norte America" }).save(),
          new Region({ name: "Centro America" }).save(),
      ]);

    console.log(values);

    
    
  } catch (error) {
    console.error(error);
  }
};


createRegion();

module.exports = createRegion;