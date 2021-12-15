const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors')
const v1 = require('../routes/v1')
const passport = require('passport')
const cookieParser = require('cookie-parser');



//Database config

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

mongoose.connection.on('connected', ()=>{   
    console.log('Connected to database')    
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})  

// Middlewares

app.use(cors())
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('../config/passport')(passport);
app.use(cookieParser())




//Routes
app.use('/api/v1', v1)

module.exports = app;