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
    solution: String,
    author: String,
    img_url: String,
    date: Date,
    status: String,
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

// TODO: Placeholder until we have access to allow students to login with their pitt info
var cachedUsername = "jhd31";

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(timeout(10000));


// TODO: Parameters that indicate specific limit, latest date, still open, 
// TODO: Refactor this
app.get('/getPittitions', (req, res) => {
  const pts = [];
  var requests = 0;
  Pittition.find().limit(10).sort({ date: -1 }).exec( (error, pittitions) => {

    for(var i in pittitions) {
      const id = pittitions[i].id
      try {
        pittitions[i] = pittitions[i].toObject();
        pittitions[i].comments = [];
      }catch(error) {console.log(error)}
     

      Comment.find({ pittitionId: id }).exec((error, comments) => {
        if(error) console.log(error);

        // Hacky solution to fix bug
        var comment_pt_id = comments[0] !== undefined ? comments[0].pittitionId : null;
        if(comment_pt_id !== null) {
          for(var j in pittitions) {
            if(String(pittitions[j]._id) === String(comment_pt_id)) {
                pittitions[j].comments = comments;
                break;
            }
          }
        }
        

        if(++requests >= pittitions.length) {

            pittitions[i].comments = pittitions[i].comments.sort(function(commentA, commentB) {

              const timeA = parseInt(new Date(commentA.date).getTime());
              const timeB = parseInt(new Date(commentB.date).getTime());

              return timeB - timeA;
            });

            res.send(pittitions);
          }
      })
      
    }
    
    
     
});
});

// All of the pittition schema/model information should be in the post body
app.post('/createPittition', (req, res) => {
  var pt = new Pittition({
    title: req.body.title,
    description: req.body.description,
    solution: req.body.solution,
    author: req.body.author,
    img_url: req.body.img_url,
    date: req.body.date,
    open: true,
    likes: [],
    comments: [{ }],
    shares: 0
  });
  pt.save(function (err) {
    if (err) res.send("Error");
    res.send("Saved pittition");
  });
});

app.post('/comment/:pittitionId', (req, res) => {
  const newComment = new Comment({ user: req.body.user, img_url: req.body.img_url, comment: req.body.comment, userType: req.body.userType, type: req.body.type, pittitionId: req.body.pittitionId, date: Date.now() });
  newComment.save(function (err) {
    if (err) res.send("Error");
    res.send("Saved comment");
  });
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

app.post('/status/:pittitionId', (req, res) => {
  Pittition.update(
    { _id: req.params.pittitionId },
    { $set: { status: req.body.status } }
  ).exec( (error, result) => {
      if(error)   res.send(error);
      else        res.send(result);
  });
});

app.post('/login', (req, res) => {
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
  try {
    Pittition.deleteOne( { "_id" : req.params.pittitionId } )
    .exec((error, result) => {
      if(error)   {
        console.log("error");
        console.log(error);
        res.send(error);
      }
      else        res.send(result);
    });
  } catch (e) {
   res.send(e)
  }
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