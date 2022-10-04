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

termRoutes.route('/term/:id').get((req, res) => {
   const id = req.params.id;
   Term.findById(id, (err, result) => {
      if (err) {
         res.send(err);
       } else {
         res.json(result);
       }
   })
})

    
module.exports = termRoutes;