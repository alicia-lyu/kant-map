const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// check if token is provided; if provided, legal or not. Info stored in req.userId
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        res.message = "No token provided!";
        req.userId = null
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.message = "Unauthorized!";
            req.userId = null
        }
        req.userId = decoded.id;
        next();
    });
};


const authJwt = {
    verifyToken
};
module.exports = authJwt;