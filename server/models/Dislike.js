const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectID,
        ref: 'Comment' 
    },
    bookId: {
        type: Schema.Types.ObjectID,
        ref: 'Book' 
    }
});

const Dislike = mongoose.model('Dislike', dislikeSchema);
modile.exports = { Dislike };