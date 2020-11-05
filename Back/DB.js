const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/datawarehouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB conectada"))
  .catch((error) => console.log(error));