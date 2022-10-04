const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    id: Number,
    name: String,
    symbolSize: Number,
    english: String,
    weblink: String,
    Nsentence: Number,
    category: Number,
});

module.exports = mongoose.model('Term', TermSchema);