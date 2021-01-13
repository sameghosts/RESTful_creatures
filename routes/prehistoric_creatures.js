const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const fs = require('fs');

//mounted at /prehistoric_creatures
let historics = fs.readFileSync('./prehistoric_creatures.json');
let histData = JSON.parse(historics);

//Index PrehCreat - /prehistoric_creatures
ROUTER.get('/', (req, res) => {
  console.log(histData);
  res.render('prehistoric_creatures/index', {historics: histData});
});
// Form for New PrehCreat
ROUTER.get('/new', (req, res) =>{
  res.render('prehistoric_creatures/new')
});

// Get 1 - /prehistoric_creatures/1
ROUTER.get('/:id', (req, res) => {
  let index = req.params.id;
  res.render('prehistoric_creatures/show', { historic: histData[index], historicID: index });
});

//Edit - Get and Put
ROUTER.get('/:id/edit', (req, res) =>{
  //send the hisotric into a client page which is the form for a put route
  let historicIndex = req.params.id
  let historics = fs.readFileSync('./prehistoric_creatures.json');
  let historicData = JSON.parse(historics);
  let thisHistoric = historicData[historicIndex]; 
    //show  404 page (endgame)
    // redirect to dinos
  if(!thisHistoric){ 
    res.redirect('/prehistoric_creatures');
  } else {
    //ship it
    res.render('prehistoric_creatures/edit', {historic: thisHistoric, historicID: historicIndex });
  }
});
ROUTER.put('/:id', (req, res) =>{
  console.log(`|-------- PUT to /historic/${req.params.id}`);
  // get the historic from my data store (same logic as show/details)
  let historicIndex = req.params.id
  let historics = fs.readFileSync('./prehistoric_creatures.json');
  let historicData = JSON.parse(historics);
  
  console.log(historicData);

  //update my historic
  historicData[historicIndex] = req.body;
  console.log(historicData);
  //write new historic to data store
  //turn historic array into json - stringify
  let historicJSON = JSON.stringify(historicData);
  fs.writeFileSync('./prehistoric_creatures.json', historicJSON);
  
  //send my response (redirect to the show/details)

  res.redirect(`/prehistoric_creatures/${req.params.id}`);
});

//destroy - POST / delete with method middleware
ROUTER.delete('/:id', (req, res) =>{
  console.log('--------DELETE--------');
  //get the dino from my data source
  let historicIndex = req.params.id;
  let historics = fs.readFileSync('./prehistoric_creatures.json');
  historicsJS = JSON.parse(historics);

  historicsJS.splice(historicIndex, 1);

  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(historicsJS));

  res.redirect('/prehistoric_creatures');
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