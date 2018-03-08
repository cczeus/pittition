const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// Compile model from schema
var Pittition = mongoose.model('PittitionModel', PittitionSchema);

// TODO: Placeholder until we have access to allow students to login with their pitt info
var cachedUsername = "jhd31";

app.use(bodyParser.json());
app.use(express.static('public'));

// TODO: Parameters that indicate specific limit, latest date, still open, 
app.get('/getPittitions', (req, res) => {
  Pittition.find().limit(10).sort({ date: -1 }).exec( (error, pittitions) => {
    res.send(pittitions);
  });
});

// All of the pittition schema/model information should be in the post body
app.get('/createPittition', (req, res) => {
  var pt = new Pittition({
    title: "Gym on Lower Campus",
    description: "Both the Pete and Trees gyms are on upper campus and there should be a gym built somewhere on lower campus.",
    author: "jhd31",
    date: Date.now(),
    open: true,
    likes: ["nis80", "chz75"],
    comments: [{
      user: "chz75",
      comment: "Great Idea!"
    }],
    shares: 3
  });
  pt.save(function (err) {
    if (err) res.send("Error");
    res.send("Saved");
  });
});

app.post('/comment/:pittitionId', (req, res) => {

});

app.post('/like/:pittitionId', (req, res) => {

});

app.post('/share/:pittitionId', (req, res) => {

});

app.post('/login', (req, res) => {

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