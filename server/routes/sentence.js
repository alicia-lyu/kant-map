// prerequisites
const { authJwt } = require("../middlewares");
const express = require("express");
const sentenceRoutes = express.Router();
const controller = require("../controllers/sentence.controller");
const termController = require("../controllers/term.controller")

// routes
sentenceRoutes.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

sentenceRoutes.use(authJwt.verifyToken); 

sentenceRoutes.route('/:termName/sentences').get(controller.getSentences);

sentenceRoutes.route('/:termName/add-sentence').get(termController.getTerm);

sentenceRoutes.route('/:termName/:sentenceId').get(controller.findSentence);

sentenceRoutes.route('/my-sentences').get(controller.getMySentences);

sentenceRoutes.route('/:termName/sentences').post(controller.postSentence);

sentenceRoutes.route('/:termName/:sentenceId').delete(controller.deleteSentence);

    
module.exports = sentenceRoutes;