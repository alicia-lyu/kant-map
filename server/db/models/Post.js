const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    text: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);