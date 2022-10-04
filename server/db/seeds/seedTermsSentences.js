const mongoose = require('mongoose');
const connectMongoose = require('../conn');
const termsWithSentences = require('./termsWithSentences');
const Term = require('../models/Term')
const Sentence = require('../models/Sentence')

const handleError = (error) => {
    console.log(error)
}

const seedTermsSentences = async () => {
    for (let termWithSentences of termsWithSentences) {
        const { sentList, ...term } = termWithSentences;
        let termDocument = new Term({
            _id: new mongoose.Types.ObjectId(),
            ...term
        });
        const saveTerm = async (termDocument, sentList) => {
            termDocument.save((error) => {
                if (error) return handleError(error);
                for (let sentence of sentList) {
                    let sentenceDocument = new Sentence({
                        text: sentence,
                        term: termDocument._id
                    });
                    sentenceDocument.save((error) => {
                        if (error) return handleError(error);
                    })
                }
            })
        }
        await saveTerm(termDocument, sentList);
        console.log(`Seeding completed for ${term.name} and its sentences.`);
    }
}

const logInfo = async () => {
    const termsCount = await Term.countDocuments();
    const sentencesCount = await Sentence.countDocuments();
    console.log(`Amount of Terms: ${termsCount}, Amount of Sentences: ${sentencesCount}.`)
}

const main = async () => {
    await connectMongoose();
    await Term.deleteMany({});
    await seedTermsSentences();
    await logInfo();
}

main().then(() => {
    mongoose.connection.close();
})




