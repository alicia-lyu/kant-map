const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const authRoutes = express.Router();

authRoutes.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRoutes.route("/auth/signup").post([
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
    ],
    controller.signup);

authRoutes.route("/auth/login").post(controller.login);

module.exports = authRoutes