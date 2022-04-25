const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const commentSchema = mongoose.Schema({
    commentWriter: {
        type: Schma.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type:Schema.Types.ObjectId,
        ref: 'Book'
    },
    comment: {
        type: String
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Comment = Schema.model('Comment', commentSchema);
module.export = { Comment };