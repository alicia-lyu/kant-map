// prerequisites
const { authJwt } = require("../middlewares");
const express = require("express");
const sentenceRoutes = express.Router();
const controller = require("../controllers/sentence.controller");
const termController = require("../controllers/term.controller")

// routes

sentenceRoutes.use(authJwt.decodeToken)

sentenceRoutes.route('/:termName/sentences').get(controller.getSentences);

sentenceRoutes.route('/:termName/add-sentence').get([authJwt.verifyToken], termController.getTerm);

sentenceRoutes.route('/my-sentences').get(controller.getMySentences);

sentenceRoutes.route('/:termName/sentences').post(controller.postSentence);

sentenceRoutes.route('/:termName/:sentenceId').delete(controller.deleteSentence);

sentenceRoutes.route('/:termName/:sentenceId').get(controller.findSentence);

    
module.exports = sentenceRoutes;  