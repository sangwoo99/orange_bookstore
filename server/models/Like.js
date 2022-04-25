const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const likeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment' 
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book' 
    }
});

const Like = mongoose.model('Like', likeSchema);
modile.exports = { Like };