const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema ({
    id: Number,
    name: String,
    symbolSize: Number,
    english: String,
    weblink: String,
    Nsentence: Number,
    category: Number,
    sentList: Array
});

module.exports = mongoose.model('List', ListSchema);