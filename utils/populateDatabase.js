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

var CommentSchema = new Schema({
  pittitionId: String,
  user: String,
  comment: String,
  userType: String,
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
    date: Date.now(),
    open: true,
    likes: ["nis80", "chz75"],
    followers: ['demo', 'nis80'],
    shares: 3
  },
  {
    title: "Add more CS courses",
    description: "There is a wide variety of courses to take at Pitt, but I am unable to sign up for any because they fill up so fast",
    author: "qjs49",
    date: Date.now(),
    open: true,
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
    userName: 'admin',
    password: 'admin',
    firstName: 'John',
    lastName: 'Doe',
    type: 'admin'
  },
  {
    userName: 'nis80',
    password: 'nis80',
    firstName: 'Nikhilesh',
    lastName: 'Singh',
    type: 'student'
  }

]
const comments = [
  {
    user: "John Doe",
    userType: "admin",
    type: "pinned",
    comment: "I agree",
    date: Date.now(),
  },
  {
    user: "nis80",
    userType: "student",
    type: "regular",
    comment: "This is a great idea!",
    date: Date.now(),
  },
  {
    user: "John Doe",
    userType: "admin",
    type: "regular",
    comment: "I agree",
    date: Date.now(),
  }
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
    console.log(comments[c]);
    var comment = new Comment(comments[c]);
    comment.save(function (err) {
      if(++c_added == comments.length - 1)   process.exit(0);
    });
  }
  
