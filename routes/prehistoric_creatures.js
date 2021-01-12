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
  let index = req.params.id;
  res.render('prehistoric_creatures/show', { historic: histData[index] });
});


// Create / Post New PreahCreat
//create - POST /prehistoric_creatures
ROUTER.post('/', (req, res) => {

  histData.push(req.body);
  let histJSON = JSON.stringify(histData);
  fs.writeFileSync('./prehistoric_creatures.json', histJSON);
  res.redirect('/prehistoric_creatures');
});  

module.exports = ROUTER;