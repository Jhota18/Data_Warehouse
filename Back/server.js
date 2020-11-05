const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require('./DB');


const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT", "POST", "GET", "DELETE");
    next();
});

//TEST DATA
require('./DBdata/createUsers');
require('./DBdata/createContact');
require('./DBdata/createCompany');
require('./DBdata/createRegion');
require('./DBdata/createCity');
require('./DBdata/createCountry');


//ROUTES REQUIRE
const userRoute= require('./routes/userRoute');

//Routes
app.use('/users', userRoute);



app.listen(3000, () => {
	console.log('Servidor escuchando en http://localhost:3000');
});
