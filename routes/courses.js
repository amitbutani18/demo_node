const { Course , validate} = require('../models/course');
const { Author } = require('../models/author');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/',async (req,res)=>{
   let result = await Course
    .find()
    .populate('author');
   res.send(result);
});


router.post('/addCourses',async (req,res)=>{
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    const author = await Author.findById(req.body.author);
    if (!author) return res.status(400).send("Invalid author.");

    let course = new Course({
        name : req.body.name,
        author : author._id
    });

    course = await course.save();
    res.send(course);
});


module.exports = router;