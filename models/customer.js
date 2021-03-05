const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 5,
        max : 250
    },
    phone : {
        type : Number,
        required : true,
        min : 10,
    },
    isGold : Boolean
});

const Customer = mongoose.model('customer', customerSchema);

function validateCustomer(customer) {
    var schema = Joi.object({
        name : Joi.string().required(),
        phone : Joi.number().min(10).required(),
        isGold : Joi.boolean()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;