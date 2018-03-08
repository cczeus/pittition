const mongoose = require('mongoose');

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

db.dropDatabase()

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
const pittitions = [
  {
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
  },
  {
    title: "Add more CS courses",
    description: "There is a wide variety of courses to take at Pitt, but I am unable to sign up for any because they fill up so fast",
    author: "qjs49",
    date: Date.now(),
    open: true,
    likes: ["nis80", "chz75", "ahs213"],
    comments: [{
      user: "chz75",
      comment: "I agree"
    }],
    shares: 12
  },

]
  var added = 0;
  for(p in pittitions) {
    var pt = new Pittition(pittitions[p]);
    pt.save(function (err) {
      if(++added == pittitions.length - 1)   process.exit(0);
    });
  }
  
