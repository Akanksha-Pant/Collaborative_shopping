require('dotenv').config();
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors')

const findOrCreate = require('mongoose-findorcreate');


const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.set("useCreateIndex", true);

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 180 * 60 * 1000},
  store: new MongoStore({ mongooseConnection: mongoose.connection })

}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);

passport.use('user-local', new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if(user != null)
    done(null, user);
});


app.get("/", function(req, res){
  res.send("Hello")
})


app.post("/register", function(req, res){
  console.log(req.body);
  User.register({
    username: req.body.username
  },
  req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.redirect("/register");
    } else{
      passport.authenticate("user-local")(req, res, function(){
        console.log("Successfully registered");
        res.send("Successfully Registered");
      })
    }
  })
})

app.post("/login", function(req, res){
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err){
    if (err){
      console.log(err);
    }
    else{
      passport.authenticate("user-local")(req, res, function(){
        console.log("Successfully logged in!");
        res.send("Logged in");
      })
    }
  })
});

app.get("/profile", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get("/products", (req, res) => {
  Product.find({}, function(err, products){
    if (err){
      console.log(err);
    }
    res.send(products);
  })
});



app.listen(process.env.PORT || 5000, function(){
  console.log("Server started on port 5000");
});
