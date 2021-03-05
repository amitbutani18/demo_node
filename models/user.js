const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLenght : 5,
        maxLenght : 250
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLenght : 6,
        maxLenght : 14
    }
});

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    var schema = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().required().email(),
        password : Joi.string().min(6).max(14).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;