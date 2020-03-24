var express=require('express');
var app=express();
var mongoose=require('mongoose');
var passport = require ("passport");
var LocalStrategy=require("passport-local");
var bodyParser = require("body-parser");
Profile        = require("./models/profile.js"),
Art            = require("./models/art.js"),
Writing        = require("./models/writing.js"),
Music        = require("./models/music.js"),
Dance        = require("./models/dance.js"),
User           = require("./models/user.js"),
seedDB         = require("./seeds.js");
methodOverride =require("method-override");
middleware     =require("./middleware");

var artRoutes    = require("./routes/art"),
    writingRoutes    = require("./routes/writing"),
    musicRoutes    = require("./routes/music"),
    danceRoutes    = require("./routes/dance"),
    profileRoutes = require("./routes/profile"),
    indexRoutes      = require("./routes/index")



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/artopedia",{useNewUrlParser : true, useUnifiedTopology: true });
app.use(methodOverride("_method"));

app.locals.moment=require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
var id;
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   var currentProfile = id;
   next();
});



////////////////////////////////////////////////////////////

app.use("/", indexRoutes);
app.use("/", profileRoutes);
app.use("/", artRoutes);
app.use("/", writingRoutes);
app.use("/", musicRoutes);
app.use("/", danceRoutes);


 
app.listen(3000,function(req,res){
console.log("Server has started");
});