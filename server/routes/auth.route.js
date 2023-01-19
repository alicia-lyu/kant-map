const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const authRoutes = express.Router();

authRoutes.route("/auth/signup").post([
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
    ],
    controller.signup);

authRoutes.route("/auth/login").post(controller.login);

module.exports = authRoutes