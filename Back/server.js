const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const sequelize = require('./DB');
const cors = require('cors');

//Express
const app = express();
app.use(helmet());
app.use(express.json());

//MODELS
const cityModel = require('./models/cityModel');
const companyModel = require('./models/companyModel');
const contactModel = require('./models/contactModel');
const countryModel = require('./models/countryModel');
const regionModel = require('./models/regionModel');
const userModel = require('./models/userModel');
cityModel.sync();
companyModel.sync();
contactModel.sync();
countryModel.sync();
regionModel.sync();
userModel.sync();


//ROUTES REQUIRE
const userRoute= require('./routes/users/userRoute');



//ALLOW CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5500");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT", "POST", "GET", "DELETE");
//     next();
// });
app.use(cors());
app.options('*', cors());




//Routes
app.use('/users', userRoute);


//SERVER PORT
app.listen(3000, () => {
	console.log('Api escuchando en http://localhost:3000');
});