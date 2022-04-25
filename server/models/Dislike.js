const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const dislikeSchema = mongoose.Schema({
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

const Dislike = mongoose.model('Dislike', dislikeSchema);
modile.exports = { Dislike };