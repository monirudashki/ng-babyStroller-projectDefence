const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const babyStrollerSchema = new mongoose.Schema({
    babyStrollerBrand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1 , "price must be positive number"] 
    },
    condition: {
        type: String,
        required: true,
        enum: ['new' , 'use']
    },
    status: {
        type: String,
        required: true,
        enum: ['active' , 'holding' , 'moderated'],
        default: 'holding'
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

const babyStroller = mongoose.model('babyStroller' , babyStrollerSchema);

module.exports = babyStroller;
