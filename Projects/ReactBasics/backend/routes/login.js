const express = require('express')
const loginController = require('../controller/login')
const loginRoute = express.Router()

loginRoute.post('/login',loginController);

module.exports = loginRoute