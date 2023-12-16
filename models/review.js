const mongoose = require('mongoose');



const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    movie:{
        type:mongoose.ObjectId,
        ref:'Movie'
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review
