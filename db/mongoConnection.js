const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

require("dotenv").config();

mongoose.connect(
    process.env.MONGO_URL_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('MongoDB is connected')
    }
)