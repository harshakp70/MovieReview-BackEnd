const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true

    },
    summary:{
        type:String
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
