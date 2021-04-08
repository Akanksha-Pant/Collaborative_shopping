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
const axios = require('axios');

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

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.set("useCreateIndex", true);

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 180 * 60 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })

}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  friends: Array,
  requests: Array
});

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String
});

const suggestionBoxSchema = new mongoose.Schema({
  userId: String,
  friendId: String,
  friendName: String,
  product: {
    _id: String,
    name: String,
    image: String,
    price: Number,
    description: String
  }
});

const wishlistSchema = new mongoose.Schema({
  userId: String,
  product: {
    _id: String,
    name: String,
    image: String,
    price: Number,
    description: String
  }
});

const buylistSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  product: {
    _id: String,
    name: String,
    image: String,
    price: Number,
    description: String
  },
  review: Array,
  rating: {
    avg: Number,
    sum: Number,
    no: Number
  }
});

const boughtlistSchema = new mongoose.Schema({
  userId: String,
  product: {
    _id: String,
    name: String,
    image: String,
    price: Number,
    description: String
  }
});

const notificationListSchema = new mongoose.Schema({
  userId: String,
  friendId: String,
  friendName: String,
  productName: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);
const SuggestionBox = new mongoose.model("SuggestionBox", suggestionBoxSchema);
const Wishlist = new mongoose.model("Wishlist", wishlistSchema);
const Buylist = new mongoose.model("Buylist", buylistSchema);
const Boughtlist = new mongoose.model("Boughtlist", boughtlistSchema);
const Notificationlist = new mongoose.model("Notificationlist", notificationListSchema);



passport.use('user-local', new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (user != null)
    done(null, user);
});


app.get("/", function(req, res) {
  res.send("Hello")
})


app.post("/register", function(req, res) {
  console.log(req.body);
  User.register({
      username: req.body.username
    },
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("user-local")(req, res, function() {
          console.log("Successfully registered");
          res.send("Successfully Registered");
        })
      }
    })
})

app.post("/login", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("user-local")(req, res, function() {
        console.log("Successfully logged in!");
        res.send("Logged in");
      })
    }
  })
});

app.get("/profile", (req, res) => {

  User.find({
    _id: req.user._id
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      if (user.length == 0) {
        res.send({});
      } else {
        res.send(user[0])
      }
    }
  })
  // res.send(req.user);
});

app.get("/user/:id", function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log("User found successfully");
      res.send(user);
    }
  })
})

app.get("/products", (req, res) => {
  Product.find({}, function(err, products) {
    if (err) {
      console.log(err);
    }
    res.send(products);
  })
});

app.get("/search", (req, res) => {
  const username = (req.query.username)
  User.find({
    'username': username
  }, function(err, users) {
    if (err) {
      console.log(err);
    }
    res.send(users);
  })
});

app.get("/request/:to/:from", function(req, res) {

  const to = req.params.to;
  const from = req.params.from;

  if (to === from) {
    console.log("You can't send a request to yourself");

  } else {
    User.find({
      _id: from
    }, function(err, fromUser) {
      if (err) {
        console.log(err);
      } else {
        fromUser = fromUser[0];

        const newRequest = {
          _id: fromUser._id,
          username: fromUser.username
        };

        User.findOneAndUpdate({
          _id: to,
          "requests._id": {
            $ne: fromUser._id
          }
        }, {
          $push: {
            requests: newRequest
          }
        }, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Request from ${from} to ${to} saved successfully.`);
          }
        })
      }
    })
  }
})

app.get("/accept/:toName/:toId/:fromName/:fromId", function(req, res) {

  const to = req.params.toId;
  const from = req.params.fromId;
  const toName = req.params.toName;
  const fromName = req.params.fromName;
  const fromFriend = {
    name: fromName,
    _id: from
  };
  const toFriend = {
    name: toName,
    _id: to
  }


  User.findOneAndUpdate({
    _id: to,
    "friends._id": {
      $ne: from
    }
  }, {
    $push: {
      friends: fromFriend
    }
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`friend ${toName}, ${fromName} saved successfully.`);
      User.findOneAndUpdate({
        _id: from,
        "friends._id": {
          $ne: to
        }
      }, {
        $push: {
          friends: toFriend
        }
      }, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`friend ${toName}, ${fromName} saved successfully.`);
          // Deleting the pending request

          axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/delete/" + to + "/" + from
          })
        }
      })
    }
  })


})

app.get("/delete/:to/:from", function(req, res) {
  const to = req.params.to;
  const from = req.params.from;

  User.find({
    _id: to
  }, function(err, user) {


    requests = user[0].requests;

    requests = requests.filter(function(request) {
      return (request._id != from);
    })


    User.updateOne({
      _id: to
    }, {
      requests: requests
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Request deleted here");

      }
    })
  })
})

//suggestionBox routes --------------------------------


app.post("/suggestion/add", function(req, res) {
  console.log(req.body);
  SuggestionBox.findOneAndUpdate({
    userId: req.body.userId,
    friendId: req.body.friendId,
    friendName: req.body.friendName,
    product: req.body.product
  }, {
    userId: req.body.userId
  }, {
    upsert: true
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Suggestion saved");
    }
  })
})


app.get("/suggestion/delete/:id", function(req, res) {
  SuggestionBox.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Product deleted from suggestions successfully");
    }
  })
})

app.get("/suggestion", function(req, res) {

  SuggestionBox.find({
    userId: req.user._id
  }, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      console.log("Suggestion products found successfully");
      res.send(products);
    }
  })
})

//wishlist routes -------------------------------------------

app.post("/wishlist/add", function(req, res) {
  const wish = new Wishlist({
    userId: req.body.userId,
    product: req.body.product
  })
  wish.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Product added to wishlist");
    }
  })
})

app.get("/wishlist/delete/:id", function(req, res) {
  Wishlist.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Product deleted from wishlist successfully");
    }
  })
})

app.get("/wishlist/:id", function(req, res) {
  Wishlist.find({
    userId: req.params.id
  }, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      console.log("wishlist products found successfully");
      res.send(products);
    }
  })
})

app.get("/wishlist/buy/:id", function(req, res) {
  console.log(req.params);
  Wishlist.find({
    _id: req.params.id
  }, function(err, item) {
    item = item[0];
    console.log(item);
    const buy = new Buylist({
      userId: item.userId,
      product: item.product,
      productId: item.product._id,
      rating: {
        avg: 0,
        no: 0,
        sum: 0
      }
    })
    buy.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Product added to buylist");

        axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:5000/wishlist/delete/" + item._id
        })
        console.log(item);
        axios.post(`http://localhost:5000/notification/add/${item.userId}`,{
          productName: item.product.name
        }, { withCredentials: true });

      }
    })
  })
})

//Buylist routes -----------------------------------------

app.post("/buylist/add", function(req, res) {
  const buy = new Buylist({
    userId: req.body.userId,
    productId: req.body.productId,
    product: req.body.product,
    rating: {
      avg: 0,
      no: 0,
      sum: 0
    }
  })
  buy.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Product added to buylist");
    }
  })
})

app.post("buylist/add/rating", function(req, res) {
  console.log("herereeeeeeee");
  Buylist.find({
    userId: req.body.userId,
    productId: req.body.productId
  }, function(err, item) {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      item = item[0];
      const sum = item.rating.sum + req.body.rating;
      var no = item.rating.no + 1;
      var avg = sum / no;
      const rating = {
        sum: sum,
        no: no,
        avg: avg
      };
      Buylist.findOneAndUpdate({
        userId: req.user._id,
        productId: req.body.productId
      }, {
        rating: rating
      }, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Rating Added");

        }
      })
    }
  })
})


app.post("/buylist/add/review", function(req, res) {
  console.log(req.body);
  const newReview = {
    friendId: req.body.friendId,
    friendName: req.body.friendName,
    text: req.body.text
  };
  Buylist.findOneAndUpdate({
    userId: req.body.userId,
    productId: req.body.productId
  }, {
    $push: {
      review: newReview
    }
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Review Added");
      console.log(req.body.userId, req.body.productId, req.body.rating);

      Buylist.find({
        userId: req.body.userId,
        productId: req.body.productId
      }, function(err, item) {
        if (err) {
          console.log(err);
        } else {
          item = item[0];
          console.log(item.rating);

          const sum = item.rating.sum + req.body.rating;
          var no = item.rating.no + 1;
          var avg = sum / no;

          const rating = {
            sum: sum,
            no: no,
            avg: avg
          };
          console.log(rating);
          Buylist.findOneAndUpdate({
            userId: req.body.userId,
            productId: req.body.productId
          }, {
            rating: rating
          }, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Rating Added");

            }
          })
        }
      })
    }
  })
})



app.get("/buylist/:id", function(req, res) {
  Buylist.find({
    userId: req.params.id
  }, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      console.log("Products found successfully");
      res.send(products);
    }
  })
})

app.get("/buylist/delete/:id", function(req, res) {
  Buylist.deleteOne({
    _id: req.params.id
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Item deleted from buyList");
    }
  })
})

app.get("/buylist/buy/:id", function(req, res){

  Buylist.find({
    _id: req.params.id
  }, function(err, item) {
    item = item[0];
    console.log(item);
    const bought = new Boughtlist({
      userId: item.userId,
      product: item.product
    })
    bought.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Product added to boughtlist");

        axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:5000/buylist/delete/" + item._id
        })
        

      }
    })
  })

})



//boughtlist routes ..........................................

app.get("/boughtlist/:id", function(req, res) {
  Boughtlist.find({
    userId: req.params.id
  }, function(err, products) {
    if (err) {
      console.log(err);
    } else {
      res.send(products);
    }
  })
})

//Notification routes -----------------------------------------
app.post("/notification/add/:id", function(req, res) {

  User.find({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      friends = user[0].friends
      friends.forEach((friend) => {

        const notif = new Notificationlist({
          userId: friend._id,
          productName: req.body.productName,
          friendName: user[0].username,
          friendId: req.params.id

        })
        notif.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Notification for ${friend.name} saved successfully`);
          }
        })
      })
    }
  })
})

app.get("/notification", function(req, res) {
  Notificationlist.find({
    userId: req.user._id
  }, function(err, notifs) {
    if (err) {
      console.log(err);
    } else {
      res.send(notifs);
    }
  })
})

app.get("/notification/delete/:id", function(req, res) {
  Notificationlist.deleteOne({
    userId: req.user._id,
    _id: req.params.id
  }, function(err, notifs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Post deleted");
    }
  })
})


app.get("/logout", function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("session destroyed");
      res.send("Successfully logged out")
    }
  })
})



app.listen(process.env.PORT || 5000, function() {
  console.log("Server started on port 5000");
});
