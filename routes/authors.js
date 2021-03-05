const { Author , validate} = require('../models/author');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


router.get('/',async (req,res)=>{
   let result = await Author.find();
   res.send(result);
});

router.post('/addAuthor',async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let author = new Author({
        name : req.body.name,
        bio : req.body.bio,
        website : req.body.website
    });

    author = await author.save();
    res.send(author);
});


module.exports = router;