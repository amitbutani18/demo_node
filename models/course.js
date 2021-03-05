const Joi = require('joi');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLenght : 5,
        maxLenght : 250
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author'
    }
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    var schema = Joi.object({
        name : Joi.string().required(),
        author : Joi.string()
    });
    return schema.validate(course);
}

exports.Course = Course;
exports.validate = validateCourse;