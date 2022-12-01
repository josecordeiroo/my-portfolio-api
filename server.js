const express = require('express')
var path = require('path');
var logger = require('morgan');
require('./backend/db/mongoConnection')
require('dotenv').config()

var cors = require('cors')

const api = require('./backend/routes')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api', api)

//Frontend connection (THIS IS FOR HEROKU)
if ( process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is connected')
})