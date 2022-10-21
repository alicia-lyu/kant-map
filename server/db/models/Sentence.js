const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SentenceSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    text: String,
    term: { type: Schema.Types.ObjectId, ref: 'terms'},
    creator: {type: Schema.Types.ObjectId, ref: 'users'} // add a default value
});

module.exports = mongoose.model('Sentence', SentenceSchema);