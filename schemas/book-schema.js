const mongoose = require('mongoose');
const bookSchema = mongoose.bookSchema;

module.export = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    publishedDate: {type: Date, required: true},
    status: {
        type: String, 
        enum: ['IN', 'OUT', 'NA'], 
        default: 'IN', 
        required: true},
    cover: String,
    genre: String,
    reviews: [
        {
        rating: {type: Number, required: true}, 
        comment: {type: String},
        username: {type: String, required: true},
        }
    ],
});

