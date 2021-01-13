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

//show / details - /dinos/:id
ROUTER.get('/:id', (req, res) =>{
  //get the index
  let dinoIndex = req.params.id
  //get mutuable dino data
  let dinos = fs.readFileSync('./dinos.json');
  let dinoData = JSON.parse(dinos);

  //find dino at said index
  let thisDino = dinoData[dinoIndex]; 

  //if there is no dino at dinoData[dinoIndex]
    //show  404 page (endgame)
    // redirect to dino/new
  if(!thisDino){ 
    res.redirect('dinos/new');
  } else {
    //ship it
    res.render('dinos/show', {dino: thisDino, dinoID: dinoIndex });
  }
});

//EDIT - GET /dinos/:id/edit
ROUTER.get('/:id/edit', (req, res) =>{
  //send the dino into a client page which is the form for a put route
  let dinoIndex = req.params.id
  let dinos = fs.readFileSync('./dinos.json');
  let dinoData = JSON.parse(dinos);
  let thisDino = dinoData[dinoIndex]; 
    //show  404 page (endgame)
    // redirect to dinos
  if(!thisDino){ 
    res.redirect('/dinos');
  } else {
    //ship it
    res.render('dinos/edit', {dino: thisDino, dinoID: dinoIndex });
  }
});

ROUTER.put('/:id', (req, res) =>{
  console.log(`|-------- PUT to /dinos/${req.params.id}`);
  // get the dino from my data store (same logic as show/details)
  let dinoIndex = req.params.id
  let dinos = fs.readFileSync('./dinos.json');
  let dinoData = JSON.parse(dinos);
  
  console.log(dinoData);

  //update my dino
  dinoData[dinoIndex] = req.body;
  console.log(dinoData);
  //write new dino to data store
  //turn dino array into json - stringify
  let dinoJSON = JSON.stringify(dinoData);
  fs.writeFileSync('./dinos.json', dinoJSON);
  
  //send my response (redirect to the show/details)

  res.redirect(`/dinos/${req.params.id}`);
});

//destroy - POST / delete with method middleware
ROUTER.delete('/:id', (req, res) =>{
  console.log('--------DELETE--------');
  //get the dino from my data source
  let dinoIndex = req.params.id;
  let dinos = fs.readFileSync('./dinos.json');
  dinosJS = JSON.parse(dinos);

  dinosJS.splice(dinoIndex, 1);

  fs.writeFileSync('./dinos.json', JSON.stringify(dinosJS));

  res.redirect('/dinos');
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
  dinosJS.push(req.body);
  //turn dino array into JSON
  let dinoJSON = JSON.stringify(dinosJS);
  //write new dino array to dinos.json
  fs.writeFileSync('./dinos.json', dinoJSON);
  res.redirect('/dinos');

});

module.exports = ROUTER;