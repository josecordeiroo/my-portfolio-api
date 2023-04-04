const express = require('express')
var path = require('path');
var logger = require('morgan');
require('./db/mongoConnection')
require('dotenv').config()

var cors = require('cors')

const bodyParser = require('body-parser')

const app = express()

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors())
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With,content-type, Authorization');
//     res.setHeader("Access-Control-Expose-Headers", "Authorization");
//     next();
// });

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const api = require('./routes')

app.use('/api', api)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected')
})
