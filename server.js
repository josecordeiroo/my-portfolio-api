const express = require('express')
var path = require('path');
var logger = require('morgan');
require('./db/mongoConnection')
require('dotenv').config()

var cors = require('cors')

const api = require('./routes')

const bodyParser = require('body-parser')

const app = express()

// app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With,content-type, Authorization');
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 });

app.use('/api', api)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected')
})