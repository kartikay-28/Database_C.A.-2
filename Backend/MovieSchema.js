const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'The movie title']
    },
    director:{
        type: String,
        required: [true,'Name of the director']
    },
    genre:{
        type: String,
        required: [true,'Genre of the movie']
    },
    releaseYear:{
        type: Number
    },
    availableCopies:{
        type: Number,
        required: [true,'Number of copies available in the collection']
    },
},
    
    { timestamps: true }

)

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie