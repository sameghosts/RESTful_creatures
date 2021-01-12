const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

//Index
ROUTER.get('/', (req, res) => {
  res.send('dinos baby!!!!');
});

module.exports = ROUTER;