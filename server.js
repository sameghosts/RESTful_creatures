//initialize express and instance as app
const EXPRESS = require('express');
const APP = EXPRESS();
const METHODOVERRIDE = require('method-override');
const path = require('path');

//ejs layouts
const EJSLAYOUTS = require('express-ejs-layouts');

//view engine
APP.set('view engine', 'ejs');
APP.use(EJSLAYOUTS);

//public folder
APP.use(EXPRESS.static(path.join(__dirname, '/static')));

//url encoded, body parsing middleware
APP.use(EXPRESS.urlencoded({ extended: false}));

//method override middleware
APP.use(METHODOVERRIDE('_method'));
//global routes
APP.get('/', (req, res) => {
  res.render('home');
});

//controllers/routes
APP.use('/dinos', require('./routes/dinos'));
APP.use('/prehistoric_creatures', require('./routes/prehistoric_creatures'));

APP.listen(8420, () => console.log('Hey! LISTEN! 🧚‍♂️'));