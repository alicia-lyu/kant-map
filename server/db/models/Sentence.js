const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SentenceSchema = new Schema ({
    text: String,
    term: { type: Schema.Types.ObjectId, ref: 'terms'}
});

module.exports = mongoose.model('Sentence', SentenceSchema);