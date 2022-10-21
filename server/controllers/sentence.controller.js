const dbStack = require("../db")
const Sentence = dbStack.sentenceModel;
const Term = dbStack.termModel;
const Mongoose = dbStack.mongoose;
const DisplayedError = require('../scripts/DisplayedError');
const isAdmin = require("../scripts/isAdmin");

const matchTermSent = async (termName, sentenceId, errorMessage) => {
    const findTermSent = async () => {
        const termDocument = await Term.findOne({ name: termName });
        const sentenceDocument = await Sentence.findById(sentenceId);
        return { termDocument, sentenceDocument }
    }
    const { termDocument, sentenceDocument } = await findTermSent();
    if (sentenceDocument.term.toString() !== termDocument._id.toString()) {
        throw new DisplayedError(errorMessage)
    }
    return {
        termDocument,
        sentenceDocument
    }
}

const handleError = (error) => {
    if (error.display = true) {
        res.send({message: error.message})
    } else {
        res.send(error)
    }
}

const getSentences = async (req, res) => {
    const termName = req.params.termName;
    const userId = req.userId;
    try {
        const termDocument = await Term.findOne({ name: termName });
        let sentences
        if (isAdmin(userId)) {
            sentences = await Sentence.find({term: termDocument._id})
        } else {
            sentences = await Sentence.find({ 
                term: termDocument._id, 
                $or: [{public: true}, {creator: userId}] 
            });
        }
        res.status(200).json({ termDocument, sentences })
    } catch (error) {
        res.send(error)
    }

    
}

const findSentence = async (req, res) => {
    const termName = req.params.termName;
    const sentenceId = req.params.sentenceId;
    const userId = req.userId;
    try {
        const { termDocument, sentenceDocument } = await matchTermSent(termName, sentenceId,
            "Sentence request is not legitimate. Sentence ID and term name do not match.");
        if (sentenceDocument.public == false && sentenceDocument.creator == userId && !isAdmin(userId)) {
            res.status(403).send("Unauthorized Entry.")
        }
        res.status(200).json({ termDocument, sentenceDocument })
    } catch (error) {
        handleError(error)
    }
}

const postSentence = async (req, res) => {
    const text = req.body.text;
    const termName = req.params.termName;
    const userId = req.userId;
    if (!userId) {
        res.status(403).send("Unauthorized Entry.")
    }
    try {
        const term = await Term.findOne({ name: termName });
        const sentenceDocument = new Sentence({
            _id: new Mongoose.Types.ObjectId(),
            text,
            term: term._id,
            public: isAdmin(userId),
            creator: userId
        });
        await sentenceDocument.save();
        res.status(200).send({ message: 'success' })
    } catch (error) {
        res.send({ message: 'failure' })
    }
}

const deleteSentence = async (req, res) => {
    const sentenceId = req.params.sentenceId;
    const termName = req.params.termName;
    const userId = req.userId;
    if (!userId) {
        res.status(403).send("Unauthorized Entry.")
    }
    try {
        const { sentenceDocument } = await matchTermSent(termName, sentenceId,
            "Sentence delete request is not legitimate. Sentence ID and term name do not match.")
        if (sentenceDocument.creator !== userId && !isAdmin(userId)) {
            res.status(403).send("Unauthorized Entry.")
        }
        await sentenceDocument.remove()
        res.status(200).send({ message: 'success' })
    } catch (error) {
        handleError(error)
    }
}

const getMySentences = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        res.status(403).send("Unauthorized Entry.")
    }
    try {
        const sentences = await Sentence.find({creator: userId});
        res.status(200).json(sentences)
    } catch (error) {
        handleError(error)
    }
}


module.exports = {
    getSentences,
    findSentence,
    postSentence,
    deleteSentence,
    getMySentences
}
