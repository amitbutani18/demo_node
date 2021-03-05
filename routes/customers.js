const { Customer , validate} = require('../models/customer');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/',async (req,res)=>{
   let result = await Customer.find();
   res.send(result);
});

router.post('/addCustomer',async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

module.exports = router;