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
//New - /dinos/new
ROUTER.get('/new', (req, res) =>{
  console.log('--------NEW DINO WHO DIS????');
  res.render('dinos/new');
});
//create - POST /dinos
ROUTER.post('/', (req, res) => {
  // res.send('Postin a dino');
  console.log(req.body)
  // add dino to dinos.json

  //turn dinos.json into a mutable array
  let dinos = fs.readFileSync('./dinos.json');
  dinosJS = JSON.parse(dinos);
  //add new dino from req.body to the array
  dinoJS.push(req.body);
  //turn dino array into JSON
  let dinoJSON = JSON.stringify(dinoJS);
  //write new dino array to dinos.json
  fs.writeFileSync('./dinos.json', dinoJSON);
  res.redirect('/dinos');

});

module.exports = ROUTER;