const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

// check if token is provided; if provided, legal or not. Info stored in req.userId
let verifyToken = (req, res, next) => {
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

let isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  };

const authJwt = {
    verifyToken,
    isAdmin
};
module.exports = authJwt;