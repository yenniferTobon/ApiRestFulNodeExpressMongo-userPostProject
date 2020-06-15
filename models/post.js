const mongoose = require('mongoose');
const Schema = mongoose.Schema; //constructor the mongoose

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('post', PostSchema); //mongoose model method to export it
