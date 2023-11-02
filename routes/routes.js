const express = require('express');

// import service handling data
const { login, register } = require('../middleware/auth')

const router = express.Router()

// base route for login and register
router.route('/api/auth/login').post(login)
router.route('/api/auth/register').post(register)

module.exports = router