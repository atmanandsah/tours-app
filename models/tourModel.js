const mongoose  = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required : [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required : [true, 'A tour must be of a groupsize']
    },
    difficulty: {
        type: String,
        required: [true, 'It must have diffcuilty']
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity:{
        type:Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have discription']
    },
    description:{
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true,'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates:[Date]
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;