const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 5,
        max : 250
    }
});

const Genre = mongoose.model('genre', genreSchema);

function validateGenre(genre) {
    var schema = Joi.object({
        name : Joi.string().required()
    });
    return schema.validate(customer);
}

exports.Genre = Genre;
exports.validate = validateGenre;