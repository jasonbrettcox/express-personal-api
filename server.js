// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME ;)
    message: "Here's the dirt",
    documentation_url: "readme here", // CHANGE ME
    base_url: "url here", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/sandwiches", description: "Get ALL the sammiches"},
      {method: "POST", path: "/api/sandwiches", description: "Create a new sammich"},
      {method: "PUT", path: "/api/sandwiches", description: "Update a sammich"},
      {method: "DELETE", path: "/api/sandwiches", description: "Delete a sammich :("}
    ]
  })
});
app.get('/api/profile', function (req, res){
  res.json({
    name: 'JSON COX',
    github_link: "https://github.com/jasonbrettcox",
    github_profile_image: "https://avatars0.githubusercontent.com/u/33739192?s=460&v=4",
    current_city: "Mile High",
    pets: [{name: "Betty", type: " Deceased Cat", breed: "Orange Tabby"}, {name: "Churro", type: "Dog", breed: "Pit Bull Terrier"}, {name: "Lord Frederick of Denverburg", type: "Future Dog", breed: "Dachshund"}]
  });
});

//get all sandwiches
app.get('/api/sandwich', function (req, res){
  db.Sandwich.find(function(err, sandwich){
    res.json(sandwich);
    });
  });

  //get one sandwich by id
  app.get('/api/sandwich/:id', function (req, res){
    db.Sandwich.findById(req.params.id, function(err, sandwich){
  if (err) {return console.log("you suck", + err)}
      res.json(sandwich);
    });      
  });
  

// post route
app.post('/api/sandwich', function (req, res){
  var newSandwich = new db.Sandwich({
    description: req.body.description,
    bread: req.body.bread,
    protein: req.body.protein,
    condiment: req.body.condiment,
    length: req.body.length
  });
  newSandwich.save(function (err, sandwich){
    if (err) {
      return console.log("save error:" + err);
    }
    console.log('saved');
    res.json(sandwich);
  });
});
//update route
app.put('/api/sandwich/:id', function (req, res){
  db.Sandwich.findOneAndUpdate({_id: req.params.id}, {$set: {description: req.body.description, bread: req.body.bread, protein: req.body.protein, condiment: req.body.condiment, length: req.body.length}}, {new: true}, function(err, sandwich){
if (err) {return console.log("you suck", + err)}
    res.json(sandwich);
  });      
});

//delete route
app.delete('/api/sandwich/:id', function (req, res){
  db.Sandwich.remove({_id: req.params.id}, function (err, sandwich) {
if (err) {return console.log("you suck", + err)}
    res.json(sandwich);
  });      
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
