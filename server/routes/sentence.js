// prerequisites
const express = require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sentenceRoutes = express.Router();
const Sentence = require('../db/models/Sentence')
const Term = require('../db/models/Term')
const DisplayedError = require('../scripts/DisplayedError')

const matchTermSent = async (termName, sentenceId, errorMessage) => {
    const findTermSent = async () => {
        const termDocument = Term.findOne({name: termName});
        const sentenceDocument = Sentence.findById(sentenceId);
        return {termDocument, sentenceDocument}
    }
    const {termDocument, sentenceDocument} = await findTermSent();
    if (sentenceDocument.term !== termDocument._id) {
        throw new DisplayedError(errorMessage)
    }
    return {
        termDocument,
        sentenceDocument
    }
}

// routes
sentenceRoutes.route('/:termName/sentences').get(async (req, res) => {
    const termName = req.params.termName;
    try {
        const term = await Term.findOne({name: termName});
        const sentences = await Sentence.find({term: term._id});
        res.json({term, sentences})
    } catch (error) {
        req.flash('error', `Error occurred while accessing ${termName}'s sentences!`);
        res.redirect('/terms')
    }
})

sentenceRoutes.route('/:termName/:sentenceId').get(async (req, res) => {
    const termName = req.params.termName;
    const sentenceId = req.params.sentenceId;
    try {
        const {termDocument, sentenceDocument} = matchTermSent(termName, sentenceId,
            "Sentence request is not legitimate. Sentence ID and term name do not match.")
        res.json({termDocument, sentenceDocument})
    } catch (error) {
        req.flash('error', error.displayedMessage || `Error occurred while accessing ${termName}'s sentence!`);
        res.redirect('/terms')
    }
})

sentenceRoutes.route('/:termName/sentences').post(async (req, res) => {
    const text = req.body.text;
    const termName = req.params.termName;
    try {
        const term = await Term.findOne({name: termName});
        const sentenceDocument = new Sentence({
            _id: new Schema.Types.ObjectId(),
            text,
            term: term._id,
            public: false
        });
        await sentenceDocument.save();
        res.send('success')
    }    catch (error) {
        res.send('failure')
    }
})

sentenceRoutes.route('/:termName/:sentenceId').delete(async (req, res) => {
    const sentenceId = req.params.sentenceId;
    const termName = req.params.termName;
    try {
        const {termDocument, sentenceDocument} = matchTermSent(termName, sentenceId,
            "Sentence delete request is not legitimate. Sentence ID and term name do not match.")
        await sentenceDocument.remove()
        res.send('success')
    }    catch (error) {
        res.send('failure')
    }
})

    
module.exports = sentenceRoutes;