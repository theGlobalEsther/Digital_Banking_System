const express = require("express");
const loginNibss = require("../services/nibss.service.js")
const {register, login} = require("../controllers/customer.controllers.js")
const customerRoute = express.Router()

customerRoute.post("/register", register)
customerRoute.post("/login", login)

module.exports = customerRoute
