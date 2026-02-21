const express = require('express');
const Profile = require('./../models/profile-model');

const router = express.Router();


router.get('/profile',async (req,res) => {
    // const {name,email,phone} = req.body;
    try {
        const user = await Profile.find();
        res.json(user);
    } catch (error) {
        res.json({message:'Internal Server Error',error})
    }
    
});

module.exports = router;
