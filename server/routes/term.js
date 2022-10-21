// prerequisites
const express = require("express");
const termRoutes = express.Router();
const controller = require('../controllers/term.controller')

// routes
termRoutes.route('/terms').get(controller.getTerm);

termRoutes.route('/term/:termName').get((req, res) => {
  res.redirect('/:termName/sentences')
});

    
module.exports = termRoutes;