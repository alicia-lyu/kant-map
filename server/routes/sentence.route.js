// prerequisites
const { authJwt } = require("../middlewares");
const express = require("express");
const sentenceRoutes = express.Router();
const controller = require("../controllers/sentence.controller");
const termController = require("../controllers/term.controller")

// routes

sentenceRoutes.route('/:termName/sentences').get([authJwt.decodeToken], controller.getSentences);

sentenceRoutes.route('/:termName/add-sentence').get([authJwt.verifyToken], termController.getTerm);

sentenceRoutes.route('/:termName/:sentenceId').get([authJwt.decodeToken], controller.findSentence);

sentenceRoutes.route('/my-sentences').get([authJwt.verifyToken], controller.getMySentences);

sentenceRoutes.route('/:termName/sentences').post([authJwt.verifyToken], controller.postSentence);

sentenceRoutes.route('/:termName/:sentenceId').delete([authJwt.verifyToken, authJwt.isAdmin], controller.deleteSentence);

    
module.exports = sentenceRoutes;