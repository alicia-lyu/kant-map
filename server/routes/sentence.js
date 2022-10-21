// prerequisites
const express = require("express");
const sentenceRoutes = express.Router();
const controller = require("../controllers/sentence.controller");
const termController = require("../controllers/term.controller")

// routes
sentenceRoutes.route('/:termName/sentences').get(controller.getSentences)

sentenceRoutes.route('/:termName/add-sentence').get(termController.getTerm)

sentenceRoutes.route('/:termName/:sentenceId').get(controller.findSentence)

sentenceRoutes.route('/:termName/sentences').post(controller.postSentence)

sentenceRoutes.route('/:termName/:sentenceId').delete(controller.deleteSentence)

    
module.exports = sentenceRoutes;