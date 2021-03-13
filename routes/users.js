const { User , validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/',async (req,res)=>{
   let result = await User.find();
   res.send(result);
});

router.post('/addUser',async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let getUser = await User.findOne({ email : req.body.email });
    if(getUser) return res.status(400).send('User Already Registered.');

    // try{
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });
        const salt =await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);
        
        user = await user.save();

        const token = user.generateAuthToken();

        ///  = jwt.sign({ _id : user._id} , config.get('jwtPrivateKey'));
        res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']));
    // }catch (err) {
    //     res.status(400).send(err.message);
    // }
    
});

module.exports = router;