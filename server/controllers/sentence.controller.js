const dbStack = require("../db")
const Sentence = dbStack.sentenceModel;
const Term = dbStack.termModel;
const Mongoose = dbStack.mongoose;

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

const getSentences = async (req, res) => {
    const termName = req.params.termName;
    try {
        const termDocument = await Term.findOne({ name: termName });
        const sentences = await Sentence.find({ term: term._id });
        res.json({ termDocument, sentences })
    } catch (error) {
        res.send(error)
    }
}

const findSentence = async (req, res) => {
    const termName = req.params.termName;
    const sentenceId = req.params.sentenceId;
    try {
        const { termDocument, sentenceDocument } = await matchTermSent(termName, sentenceId,
            "Sentence request is not legitimate. Sentence ID and term name do not match.")
        res.json({ termDocument, sentenceDocument })
    } catch (error) {
        res.send(error)
    }
}

const postSentence = async (req, res) => {
    const text = req.body.text;
    const termName = req.params.termName;
    try {
        const term = await Term.findOne({ name: termName });
        const sentenceDocument = new Sentence({
            _id: new Mongoose.Types.ObjectId(),
            text,
            term: term._id,
            public: false
        });
        await sentenceDocument.save();
        res.send({ message: 'success' })
    } catch (error) {
        res.send({ message: 'failure' })
    }
}

const deleteSentence = async (req, res) => {
    const sentenceId = req.params.sentenceId;
    const termName = req.params.termName;
    try {
        const { sentenceDocument } = await matchTermSent(termName, sentenceId,
            "Sentence delete request is not legitimate. Sentence ID and term name do not match.")
        await sentenceDocument.remove()
        res.send({ message: 'success' })
    } catch (error) {
        res.send({ message: 'failure' })
    }
}


module.exports = {
    getSentences,
    findSentence,
    postSentence,
    deleteSentence
}
