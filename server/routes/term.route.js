// prerequisites
const express = require("express");
const termRoutes = express.Router();
const controller = require('../controllers/term.controller')

// routes
termRoutes.route('/').get((req, res) => {
  res.redirect('/terms')
})
termRoutes.route('/terms').get(controller.getTerm);

termRoutes.route('/term/:termName').get((req, res) => {
  const termName = req.params.termName
  res.redirect(`/${termName}/sentences`)
});

termRoutes.route('/:termName').get((req, res) => {
  const termName = req.params.termName
  res.redirect(`/${termName}/sentences`)
});

    
module.exports = termRoutes;