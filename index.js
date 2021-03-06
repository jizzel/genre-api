const express   = require('express'),
    app         = express(),
    morgan      = require('morgan'),
    debug       = require('debug')('app:expressApp'),
    port        = process.env.PORT || 5000,
    genres      = require('./routes/genres'),
    customers   = require('./routes/customers'),
    movies      = require('./routes/movies'),
    rentals     = require('./routes/rentals'),
    Fawn        = require('fawn'),
    mongoose    = require('mongoose');

Fawn.init(mongoose);

mongoose.connect('mongodb://localhost/genre-base', {useNewUrlParser: true})
    .then(() => console.log('MongoDB successfully connected'))
    .catch((err)=> console.log('Failed to connect o mongoDb: ', err));



app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/movies', movies);
app.use('/api/v1/rentals', rentals);

app.get('/', (req,res) => {
    res.send('Welcome to Vidly!')
});

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan is enabled! \n Debug is Enabled!');
}

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});


