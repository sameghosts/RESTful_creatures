const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const fs = require('fs');

//Index
ROUTER.get('/', (req, res) => {
  let dinos = fs.readFileSync('./dinos.json');
  let dinoData = JSON.parse(dinos);
  console.log(dinoData);
  res.render('dinos/index', {dinos: dinoData });
});

module.exports = ROUTER;