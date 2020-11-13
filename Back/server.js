const express = require("express");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const sequelize = require("./DB");
const cors = require("cors");

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//MODELS
const cityModel = require("./models/cityModel");
const companyModel = require("./models/companyModel");
const contactModel = require("./models/contactModel");
const countryModel = require("./models/countryModel");
const regionModel = require("./models/regionModel");
const userModel = require("./models/userModel");

companyModel.sync();
contactModel.sync();
regionModel.sync();
countryModel.sync();
cityModel.sync();
userModel.sync();

//ROUTES REQUIRE
const userRoute = require("./routes/users/userRoute");
const regionRoute = require("./routes/regions/regionRoute");
const countryRoute = require("./routes/countries/countryRoute");

//ALLOW CORS
app.use(cors());
app.options("*", cors());

//Routes
app.use("/users", userRoute);
app.use("/region", regionRoute);
app.use("/country", countryRoute);

//SERVER PORT
app.listen(3000, () => {
  console.log("Api escuchando en http://localhost:3000");
});
