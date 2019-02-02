const Joi       = require('joi'),
    mongoose    = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    } ,

});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}


module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validate = validateGenre;