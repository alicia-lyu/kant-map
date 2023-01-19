const { authJwt } = require("../middlewares")
const controllers = require("../controllers/user.controller")
const express = require("express")
const userRoutes = express.Router()

userRoutes.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

userRoutes.route("/user").get([authJwt.verifyToken], controllers.userAccess)

userRoutes.route("/admin").get([
    authJwt.verifyToken,
    authJwt.isAdmin
], controllers.adminAccess)

module.exports = userRoutes
