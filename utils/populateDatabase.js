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
    img_url: String,
    date: Date,
    status: String,
    likes: [String],
    shares: String,
    followers: [String],
});

var UserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    img_url: String,
    type: String
});

var CommentSchema = new Schema({
  pittitionId: String,
  user: String,
  comment: String,
  userType: String,
  img_url: String,
  type: String,
  date: Date,
})

// Compile model from schema
var Pittition = mongoose.model('PittitionModel', PittitionSchema);
var User = mongoose.model('UserModel', UserSchema);
var Comment = mongoose.model('CommentModel', CommentSchema);
const pittitions = [
  {
    title: "Gym on Lower Campus!",
    description: "Both the Pete and Trees gyms are on upper campus and there should be a gym built somewhere on lower campus.",
    author: "jhd31",
    img_url: 'http://niksingh.net/img/matt.jpg',
    date: Date.now(),
    status: 'waiting',
    likes: ["nis80", "chz75"],
    followers: ['demo', 'nis80'],
    shares: 3
  },
  {
    title: "Gym on Lower Campus!",
    description: "Both the Pete and Trees gyms are on upper campus and there should be a gym built somewhere on lower campus.",
    author: "jhd31",
    img_url: 'http://niksingh.net/img/shridhar.jpg',
    date: Date.now(),
    status: 'waiting',
    likes: ["nis80", "chz75"],
    followers: ['demo', 'nis80'],
    shares: 3
  },
  {
    title: "Problem with University Policy X",
    description: "This policy is no good because blah blah blah",
    author: "ajs123",
    img_url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    date: new Date(Date.now() - 5827392),
    status: 'waiting',
    likes: ["nis80", "chz75", "", "", "","", "", "","", "", "","", "", "","", "", "","", "", "","", "", ""],
    followers: ['demo', 'nis80'],
    shares: 181
  },
  {
    title: "Add more CS courses",
    description: "There is a wide variety of courses to take at Pitt, but I am unable to sign up for any because they fill up so fast",
    img_url: 'http://niksingh.net/img/pic.jpg',
    author: "qjs49",
    date: new Date(Date.now() - 201202030),
    status: 'waiting',
    likes: ["nis80", "chz75", "ahs213"],
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
    img_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    type: 'student'
  },
  {
    userName: 'demo',
    password: 'demo',
    firstName: 'John',
    lastName: 'Doe',
    img_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    type: 'student'
  },
  {
    userName: 'admin',
    password: 'admin',
    firstName: 'John',
    lastName: 'Doe',
    img_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    type: 'admin'
  },
  {
    userName: 'nis80',
    password: 'nis80',
    firstName: 'Nikhilesh',
    lastName: 'Singh',
    img_url: 'http://niksingh.net/img/pic.jpg',
    type: 'student'
  }

]
const comments = [
  {
    user: "nis80",
    userType: "student",
    type: "regular",
    comment: "This is a great idea!",
    img_url: 'http://niksingh.net/img/pic.jpg',
    date: Date.now(),
  },
  {
    user: "John Doe",
    userType: "admin",
    type: "pinned",
    comment: "Just letting everyone know we are working on it",
    img_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    date: Date.now(),
  },
  {
    user: "John Doe",
    userType: "admin",
    type: "regular",
    comment: "Good idea!!",
    img_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    date: new Date(Date.now() - 600000),
  },
]

  var pt_added = 0;
  
  for(p in pittitions) {
    var pt = new Pittition(pittitions[p]);
    
    for(i in comments)
      comments[i].pittitionId = pt._id
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

  var c_added = 0;
  for(c in comments) {
    var comment = new Comment(comments[c]);
    console.log(comment)
    comment.save(function (err) {
      if(++c_added == comments.length - 1)   process.exit(0);
    });
  }
  
