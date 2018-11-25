const express = require('express'),
    router = express.Router(),
    { Customer, validate } = require('../models/customer');

router.get('/', async (req, res) => {
    // All customers
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    // Look up the id
    const customer = await Customer.findById(req.params.id);
    customer ? res.send(customer) : res.status(404).send('The customer with the given ID was not found');
});

router.post('/', async (req, res) => {
    // validate
    // If error return error
    const { error } = validate(req.body);
    if(error) return console.log(error); //res.send(error.details[0].message);

    // Create customer
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    // Save new customer
    const result = await customer.save();

    // Return newly saved customer
    res.send(result);//customers[customer.id-1]);

});

router.put('/:id', async (req, res) => {
    //validate
    const { error } = validate(req.body);
    //If invalid return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    res.send(result);
});

router.delete('/:id', async (req, res) => {

    const result = await Customer.findByIdAndRemove(req.params.id);
    console.log('result is: ',result);
    res.send(result);
});



module.exports = router;