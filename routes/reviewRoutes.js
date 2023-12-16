const express = require('express')
const router = express.Router()
const Review = require('../models/review')


router.get('/',async(req, res) => {
    try{
        const reviews = await Review.find()
    res.status(200).json(reviews)

    }
    catch(error){
        res.status(500).send("could not fetch data")
    }
    
})
router.get('/:reviewId', async (req,res) =>{
    try{
        const review =   await Review.findById(req.params.reviewId).exec();
        res.status(200).json(review)
    }
    catch(error){
        res.status(404).send("data not found")
    }
  

})
router.post('/',async(req,res)=>{
    
    try{
        const review = new Review(req.body)
        await review.save()
        res.status(201).json(review)
    }
    catch(error){
        res.status(400).send("check data")
    }
})
router.patch('/:reviewId', async(req,res)=>{
    try{
        const data = req.body
        const review = await Review.findByIdAndUpdate(req.params.reviewId,data,{new:true})
        res.status(200).json(review)
    }
    catch(error){
        res.status(404).send("data not found")
    }
    
})
router.delete('/:reviewId',async(req,res) => {
    try{
        await Review.findByIdAndDelete(req.params.reviewId)
        res.status(204).send("review deleted")
    }
    catch(error){
        res.status(404).send('review not found')

    }
})

module.exports = router
