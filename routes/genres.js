const express = require('express'),
    router = express.Router(),
    Joi = require('joi');

const genres = [
    { id: 1,name: 'Action' },
    { id: 2,name: 'Horror' },
    { id: 3,name: 'Romance' }
];

router.get('/', (req, res) => {
    // All genres
    res.send(genres);
});

router.get('/:id', (req, res) => {
    // Look up the id
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    genre ? res.send(genre) : res.status(404).send('The genre with the given ID was not found');
});

router.post('/', (req, res) => {
    // Validate
    // If error return error
    const { error } = validateGenre(req.body);
    if(error) return res.send(error.details[0].message);

    // Create genre
    const genre = [
        {
            id: genres.length + 1,
            name: req.body.name
        }
    ];

    // Save new genre
    genres.push(genre);

    // Return newly saved genre
    res.send(genres[genre.id-1]);

});

router.put('/:id', (req, res) => {
    //Look up the genre
    //If not existing return 404
    const genre = genres.find(c => parseInt(req.params.id) === c.id);
    if(!genre) res.status(404).send('The genre with the given ID is not found!');

    //validate
    const { error } = validateGenre(req.body);
    //If invalid return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);

    //update the course
    genre.name = req.body.name;
    //Return the updated course
    return res.send(genre);
});

router.delete('/:id', (req, res) => {
    //Look up the genre
    //If not existing return 404
    const genre = genres.find(c => parseInt(req.params.id) === c.id);
    if(!genre) res.status(404).send('The genre with the given ID is not found!');

    //update the course
    const index = genres.indexOf(genre);
    genres.splice(index,1);

    //Return the updated course
    return res.send(genre);
});

function validateGenre(genre){
    const schema = {
        name: Joi.string.min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;