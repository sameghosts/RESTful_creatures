const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const fs = require('fs');

//mounted at /prehistoric_creatures
let historics = fs.readFileSync('./prehistoric_creatures.json');
let histData = JSON.parse(historics);

//Index PrehCreat - /prehistoric_creatures
ROUTER.get('/', (req, res) => {
  console.log(histData);
  res.render('prehistoric_creatures/index', {historics: histData });
});
// Form for New PrehCreat
ROUTER.get('/new', (req, res) =>{
  res.render('prehistoric_creatures/new')
});

// Get 1 - /prehistoric_creatures/1
ROUTER.get('/:id', (req, res) => {
  res.render('prehistoric_creatures/show', {historics: histData[req.params.id]})
});


// Create / Post New PreahCreat
//create - POST /prehistoric_creatures
// ROUTER.post('/', (req, res) => {
//   console.log(req.body)
  // add prehistoric creature to prehistoric_creatures.json

  //turn prehistoric_creatures.json into a mutable array
  //add new PrehCreat from req.body to the array

  //turn PrehCreat array into JSON - JSON.stringify

  //write new PrehCreat array to prehistoric_creatures.JSON

  module.exports = ROUTER;