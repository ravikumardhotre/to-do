const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer') 
const route = require('./routes/route.js');
const cors = require('cors');
require('dotenv').config(); 
const app = express();


const corsOptions = {
    origin: 'http://localhost:4200', // Change this to the desired origin
    credentials: true // Indicates whether or not the response to the request can be exposed when the credentials flag is true
  }
  
  app.use(cors(corsOptions));
  
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose')

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
    .then(() => console.log('db running on 27017'))
    .catch(err => console.log(err))

    
app.use(multer().any()) // HERE
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

