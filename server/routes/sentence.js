// prerequisites
const sentenceRoutes = express.Router();
const Sentence = require('../db/models/Sentence')
const Term = require('../db/models/Term')
const connectMongoose = require('../db/conn')
connectMongoose();

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
    try {
        const findTermSent = async () => {
            const term = Term.findOne({name: termName});
            const sentenceId = req.params.sentenceId;
            const sentence = Sentence.findById(sentenceId);
            return {term, sentence}
        }
        const {term, sentence} = await findTermSent();
        res.json({term, sentence})
    } catch (error) {
        req.flash('error', `Error occurred while accessing ${termName}'s sentence!`);
        res.redirect('/terms')
    }
})

sentenceRoutes.route('/:termName/add-sentence').get(async (req, res) => {
    const text = req.body.text;
    const termName = req.params.termName;
    try {
        const term = await Term.findOne({name: termName});
        const sentenceDocument = new Sentence({
            text,
            term: term._id,
            public: false
        });
        sentenceDocument.save();
        req.flash('success', 'Sentence added successfully! You can view it while logging into your account.');
        res.redirect(`/${termName}`)
    }    catch (error) {
        req.flash('error', 'Error occurred while adding a sentence!');
        res.redirect('/terms')
    }
})
    
module.exports = termRoutes;