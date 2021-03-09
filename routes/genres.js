const { Genre , validate} = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


router.get('/',async (req,res)=>{
   let result = await Genre.find();
   res.send(result);
});

router.post('/addGenres', auth ,async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ 
        name : req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});


module.exports = router;