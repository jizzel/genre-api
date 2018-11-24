const express   = require('express'),
    app         = express(),
    Joi         = require('joi'),
    morgan      = require('morgan'),
    debug       = require('debug')('app:expressApp'),
    port        = process.env.PORT || 5000,
    genres      = require('./routes/genres'),
    mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:vidly', {useNewUrlParser: true})
    .then((message) => console.log('MongoDB: ',message))
    .catch((err)=> console.log('Error: ', err));



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/genres', genres);
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


