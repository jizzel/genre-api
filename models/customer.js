const mongoose = require('mongoose'),
    Joi = require('joi');

const Customer = mongoose.model('customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } ,
    phone: String,
    isGold: Boolean

}));

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;

module.exports.validate = validateCustomer;