const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user')


router.get('/',async(req, res) => {
    try{
        const users = await User.find()
    res.status(200).json(users)

    }
    catch(error){
        res.status(500).send("could not fetch data")
    }
    
})
router.get('/:userId', async (req,res) =>{
    try{
        const user =   await User.findById(req.params.userId).exec();
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).send("data not found")
    }
  

})
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(404).send("user not found!")
        }
      const passwordsMatch =   bcrypt.compareSync(req.body.password, user.password);

      if(passwordsMatch){
        const token = jwt.sign({ _id:user._id,email:user.email,name:user.name, }, process.env.TOKEN_SECRET);
        res.status(200).json(token)
      }
      else{
        return res.status(401).send("Unauthorised access")
      }
    }
    catch(error){
        res.status(404).send("user not found")
    }
})
router.post('/signup',async(req,res)=>{
    
    try{
        const saltRounds = 10;
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hash
        })
        await user.save()
        res.status(201).json(user)
    }
    catch(error){
        res.status(400).send("check data")
    }
})
router.patch('/:userId', async(req,res)=>{
    try{
        const data = req.body
        const user = await User.findByIdAndUpdate(req.params.userId,data,{new:true})
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).send("data not found")
    }
    
})
router.delete('/:userId',async(req,res) => {
    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(204).send("user deleted")
    }
    catch(error){
        res.status(404).send('user not found')

    }
})

module.exports = router
