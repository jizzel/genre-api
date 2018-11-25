const express = require('express'),
    router = express.Router(),
    Joi = require('joi'),
    mongoose = require('mongoose');

const Genre = mongoose.model('Genre', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } ,

}));


router.get('/', async (req, res) => {
    // All genres
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    // Look up the id
    const genre = await Genre.findById(req.params.id);
    genre ? res.send(genre) : res.status(404).send('The genre with the given ID was not found');
});

router.post('/', async (req, res) => {
    // Validate
    // If error return error
    const { error } = validateGenre(req.body);
    if(error) return console.log(error); //res.send(error.details[0].message);

    // Create genre
    const genre = new Genre({
        name: req.body.name
    });

    // Save new genre
    const result = await genre.save(genre);

    // Return newly saved genre
    res.send(result);//genres[genre.id-1]);

});

router.put('/:id', async (req, res) => {
    //validate
    const { error } = validateGenre(req.body);
    //If invalid return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    res.send(result);

    //Look up the genre
    //If not existing return 404
    // const genre = genres.find(c => parseInt(req.params.id) === c.id);
    // if(!genre) res.status(404).send('The genre with the given ID is not found!');

    //validate
    // const { error } = validateGenre(req.body);
    //If invalid return 400 bad request
    // if(error) return res.status(400).send(error.details[0].message);

    //update the course
    // genre.name = req.body.name;
    //Return the updated course
    // return res.send(genre);
});

router.delete('/:id', async (req, res) => {

    const result = await Genre.findByIdAndRemove(req.params.id);
    console.log('result is: ',result);
    res.send(result);

    //Look up the genre
    //If not existing return 404
    // const genre = genres.find(c => parseInt(req.params.id) === c.id);
    // if(!genre) res.status(404).send('The genre with the given ID is not found!');

    //update the course
    // const index = genres.indexOf(genre);
    // genres.splice(index,1);

    //Return the updated course
    // return res.send(genre);
});

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;