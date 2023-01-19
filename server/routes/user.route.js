const { authJwt } = require("../middlewares")
const controllers = require("../controllers/user.controller")
const express = require("express")
const userRoutes = express.Router()

userRoutes.route("/user").get([authJwt.verifyToken], controllers.userAccess)

userRoutes.route("/admin").get([
    authJwt.verifyToken,
    authJwt.isAdmin
], controllers.adminAccess)

module.exports = userRoutes
