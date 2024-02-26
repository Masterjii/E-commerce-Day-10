
// 5th Jan Lecture DOne ✅


// joi dev -> THis is using for validate in server side.

const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    img: Joi.string().trim(),
    price: Joi.number().min(0).required(),
    desc:Joi.string().trim(),
})

const reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().required().trim(),
});

module.exports = {productSchema, reviewSchema};

// Creating Middleware(/products/new) for checking server side before adding in the server 





















