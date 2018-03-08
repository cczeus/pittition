const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const timeout     = require('connect-timeout');

const app = express();

mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pittition', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var PittitionSchema = new Schema({
    title: String,
    description: String,
    author: String,
    date: Date,
    open: Boolean,
    likes: [String],
    comments: [{
      user: String,
      comment: String
    }],
    shares: Number
});

var UserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    type: String
});

// Compile model from schema
var Pittition = mongoose.model('PittitionModel', PittitionSchema);
var User = mongoose.model('UserModel', UserSchema);

// TODO: Placeholder until we have access to allow students to login with their pitt info
var cachedUsername = "jhd31";

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(timeout(12000));


// TODO: Parameters that indicate specific limit, latest date, still open, 
app.get('/getPittitions', (req, res) => {
  Pittition.find().limit(10).sort({ date: -1 }).exec( (error, pittitions) => {
    res.send(pittitions);
  });
});

// All of the pittition schema/model information should be in the post body
app.post('/createPittition', (req, res) => {
  var pt = new Pittition({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    date: Date.now(),
    open: true,
    likes: [],
    comments: [{ }],
    shares: 0
  });
  pt.save(function (err) {
    if (err) res.send("Error");
    res.send("Saved");
  });
});

app.post('/comment/:pittitionId', (req, res) => {

});

app.post('/like/:pittitionId', (req, res) => {

  Pittition.update(
    { _id: req.params.pittitionId },
    { $set: { likes: req.body.likes } }
  ).exec( (error, result) => {
      if(error)   res.send(error);
      else        res.send(result);
  });
  
});

app.post('/share/:pittitionId', (req, res) => {

});

app.post('/login', (req, res) => {
  console.log("LOGGIN IN")
  // TODO find how to use similar to where once I have access to internet
  User.find().limit(10).sort({ date: -1 }).exec( (error, users) => {
    var user =  "error"

    for(i in users) {
      if(verify(users[i].userName, req.body.userName) && verify(users[i].password, req.body.password)) {
        user = users[i];
        break;
      }
    }
    res.send(user)
  });
});

app.delete('/delete/:pittitionId', (req, res) => {
  
});

app.post('/close/:pittitionId', (req, res) => {

});

app.use(function (req, res, next) {
  res.status(404).send("404 Page Not Found");
});

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

// TODO: put in seperate file
function verify(observed, expected) {
  return observed === expected;
}