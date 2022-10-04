const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema ({
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    sentences: [{ 
        sentence: {type: Schema.Types.ObjectId, ref: 'sentences'},
        remark: String,
        dateAdded: Date
    }]
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);