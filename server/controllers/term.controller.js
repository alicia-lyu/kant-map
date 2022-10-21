const dbStack = require("../db")
const Term = dbStack.termModel;
const Mongoose = dbStack.mongoose;

const getTerm = (req, res) => {
    Term.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

module.exports = { getTerm }