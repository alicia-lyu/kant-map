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
  res.redirect('/:termName/sentences')
})

    
module.exports = termRoutes;