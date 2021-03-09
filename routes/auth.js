const { User } = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email : req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    let validPass = await bcrypt.compare( req.body.password , user.password);
    if(!validPass)  return res.status(400).send('Invalid email or password.');
    
    var token = user.generateAuthToken();

    /// const token = jwt.sign({ _id : user._id} , config.get('jwtPrivateKey'));
    res.send(token);
});

function validate(req) {
    var schema = Joi.object({
        email : Joi.string().required().email(),
        password : Joi.string().min(6).max(14).required()
    });
    return schema.validate(req); 
}


module.exports = router;