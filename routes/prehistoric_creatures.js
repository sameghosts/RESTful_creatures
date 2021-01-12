const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const fs = require('fs');


//Index PrehCreat - /prehistoric_creatures
ROUTER.get('/', (req, res) => {
  let prehCreats = fs.readFileSync('./prehistoric_creatures.json');
  let prehCreatData = JSON.parse(prehCreats);
  console.log(prehCreatData);
  res.render('prehistoric_creatures/index', {prehCreats: prehCreatData });
});

// Get 1 - /prehistoric_creatures/1

// Form for New PrehCreat


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