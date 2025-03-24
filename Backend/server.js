const express = require('express');
const mongoose = require('mongoose');
const app =express();
const PORT = 3000;
const movieroutes = require('./Movieroutes')
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(' MongoDB Connected')
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`)
        })
    
    })
    .catch((err) => {
        console.error(' MongoDB Connection Error:', err)
    })
app.use(express.json())
app.use('/movie',movieroutes)