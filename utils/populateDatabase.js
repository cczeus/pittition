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
  solution: String,
  author: String,
  date: Date,
  open: Boolean,
  likes: [String],
  comments: [{
    date: Date,
    user: String,
    comment: String
  }],
  followers: [String],
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
const pittitions = [
  {
    title: "Gym on Lower Campus",
    description: "Both the Pete and Trees gyms are on upper campus and there should be a gym built somewhere on lower campus.",
    solution: "Add a weightlifting gym in Litchfield towers",
    author: "jhd31",
    date: Date.now(),
    open: true,
    likes: ["nis80", "chz75"],
    comments: [{
      date: Date.now(),
      user: "chz75",
      comment: "Great Idea!"
    }],
    followers: ['demo', 'nis80'],
    shares: 3
  },
  {
    title: "Add more CS courses",
    description: "There is a wide variety of courses to take at Pitt, but I am unable to sign up for any because they fill up so fast",
    solution: "Add more courses for CS 1600+",
    author: "qjs49",
    date: Date.now(),
    open: true,
    likes: ["nis80", "chz75", "ahs213"],
    comments: [{
      date: Date.now(),
      user: "chz75",
      comment: "I agree"
    }],
    followers: [],
    shares: 12
  },

]

const users = [
  {
    userName: 'demo_student',
    password: 'demo_password',
    firstName: 'John',
    lastName: 'Doe',
    type: 'student'
  },
  {
    userName: 'demo',
    password: 'demo',
    firstName: 'John',
    lastName: 'Doe',
    type: 'student'
  },
  {
    userName: 'nis80',
    password: 'nis80',
    firstName: 'Nikhilesh',
    lastName: 'Singh',
    type: 'student'
  },
  {
    userName: 'jhd31',
    password: 'jhd31',
    firstName: 'John',
    lastName: 'Doe',
    type: 'student'
  }

]
  var pt_added = 0;
  
  for(p in pittitions) {
    var pt = new Pittition(pittitions[p]);
    pt.save(function (err) {
      if(++pt_added == pittitions.length - 1)   process.exit(0);
    });
  }

  var u_added = 0;
  for(u in users) {
    var us = new User(users[u]);
    us.save(function (err) {
      if(++u_added == users.length - 1)   process.exit(0);
    });
  }
  
