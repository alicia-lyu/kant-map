const mongoose = require('mongoose');
const connectMongoose = require('../conn');
const dbStack = require('../index');
const termsWithSentences = require('./termsWithSentences');
const Term = dbStack.termModel
const Sentence = dbStack.sentenceModel

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
        const saveSentences = async () => {
            for (let sentence of sentList) {
                let sentenceDocument = new Sentence({
                    _id: new mongoose.Types.ObjectId(),
                    text: sentence,
                    term: termDocument._id
                });
                await sentenceDocument.save().catch(handleError)
            }
        }
        await saveSentences();
        await termDocument.save().catch(handleError)
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
    await Sentence.deleteMany({});
    await seedTermsSentences();
    await logInfo();
}

main().then(() => {
    mongoose.disconnect();
})




