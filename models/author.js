const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 5,
        max : 250
    },
    bio : {
        type : String,
        required : true,
        min : 10,
    },
    website : String
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
    var schema = Joi.object({
        name : Joi.string().required(),
        bio : Joi.string().min(10).required(),
        website : Joi.string()
    });
    return schema.validate(author);
}

exports.Author = Author;
exports.validate = validateAuthor;