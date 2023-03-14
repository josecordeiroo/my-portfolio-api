const router = require('express').Router()
require('../db/mongoConnection')

const project = require('./project')
const user = require('./user')

router.get('/', (req, res) => {
    res.json({
        success: false,
        message: '/api is just for server'
    })
})

router.use('/project', project)
router.use('/users', user)

module.exports = router