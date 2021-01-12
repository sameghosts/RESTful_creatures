const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

//Index
ROUTER.get('/', (req, res) => {
  res.render('dinos/index', {dinos: [] });
});

module.exports = ROUTER;