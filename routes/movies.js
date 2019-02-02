const express = require('express'),
    router = express.Router(),
    Genre = require('../models/genre'),
    { Movie, validate } = require('../models/movie');



router.get('/', async (req, res) => {
    // All movies
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    // Look up the id
    const movie = await Movie.findById(req.params.id);
    movie ? res.send(movie) : res.status(404).send('The movie with the given ID was not found');
});

router.post('/', async (req, res) => {
    // Validate
    // If error return error
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) res.status(400).send('Invalid genre');

    // Create movie
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    // Save new movie
    movie = await movie.save();

    // Return newly saved movie
    res.send(movie);//movies[movie.id-1]);

});

router.put('/:id', async (req, res) => {
    //validate
    const { error } = validate(req.body);
    //If invalid return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);

    const result = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    res.send(result);

    //Look up the movie
    //If not existing return 404
    // const movie = movies.find(c => parseInt(req.params.id) === c.id);
    // if(!movie) res.status(404).send('The movie with the given ID is not found!');

    //validate
    // const { error } = validate(req.body);
    //If invalid return 400 bad request
    // if(error) return res.status(400).send(error.details[0].message);

    //update the course
    // movie.name = req.body.name;
    //Return the updated course
    // return res.send(movie);
});

router.delete('/:id', async (req, res) => {

    const result = await Movie.findByIdAndRemove(req.params.id);
    console.log('result is: ',result);
    res.send(result);

    //Look up the movie
    //If not existing return 404
    // const movie = movies.find(c => parseInt(req.params.id) === c.id);
    // if(!movie) res.status(404).send('The movie with the given ID is not found!');

    //update the course
    // const index = movies.indexOf(movie);
    // movies.splice(index,1);

    //Return the updated course
    // return res.send(movie);
});

module.exports = router;