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
    res.render('dinos/show', {dino: thisDino });
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
  console.log(req.body);
  res.send(`Editing dino at ${req.params.id}`);
})

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