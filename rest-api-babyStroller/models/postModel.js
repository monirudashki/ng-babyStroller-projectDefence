const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    strollerId: {
        type: ObjectId,
        ref: "babyStroller"
    },
}, { timestamps: { createdAt: 'created_at' } });

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
