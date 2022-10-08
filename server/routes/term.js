// prerequisites
const express = require("express");
const termRoutes = express.Router();
const Term = require('../db/models/Term')

// routes
termRoutes.route('/terms').get((req, res) => {
   Term.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
})

termRoutes.route('/term/:termName').get((req, res) => {
   const termName = req.params.termName; // string manipulation needed
   Term.findOne({name: termName}, (err, result) => {
      if (err) {
         res.send(err);
       } else {
         res.json(result);
       }
   })
})

    
module.exports = termRoutes;