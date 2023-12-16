const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')


router.get('/',async(req, res) => {
    try{
        const movies = await Movie.find()
    res.status(200).json(movies)

    }
    catch(error){
        console.log(error)
        res.status(500).send("could not fetch data")
    }
    
})
router.get('/:movieId', async (req,res) =>{
    try{
        const movie =   await Movie.findById(req.params.movieId).exec();
        res.status(200).json(movie)
    }
    catch(error){
        res.status(404).send("data not found")
    }
  

})
router.post('/',async(req,res)=>{
    try{
        const movie = new Movie(req.body)
        await movie.save()
        res.status(201).json(movie)
    }
    catch(error){
        res.status(400).send("check data")
    }
})
router.patch('/:movieId', async(req,res)=>{
    try{
        const data = req.body
        const movie = await Movie.findByIdAndUpdate(req.params.movieId,data,{new:true})
        res.status(200).json(movie)
    }
    catch(error){
        res.status(404).send("data not found")
    }
    
})
router.delete('/:movieId',async(req,res) => {
    try{
        await Movie.findByIdAndDelete(req.params.movieId)
        res.status(204).send("Movie deleted")
    }
    catch(error){
        res.status(404).send('movie not found')

    }
})

module.exports = router