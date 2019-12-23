var express=require('express');
var app=express();
var mongoose=require('mongoose');
var passport = require ("passport");
var LocalStrategy=require("passport-local");
var bodyParser = require("body-parser");
Profile  = require("./models/profile.js"),
Art     = require("./models/art.js"),
User        = require("./models/user.js"),
seedDB = require("./seeds.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/artopedia",{useNewUrlParser : true, useUnifiedTopology: true });

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

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// var data=[{name: "Madhushree",
//     description:"dvs",
//     phone:65763,
//     email:"m@gmail.com"}];

//     data.forEach(function(seed){
//         Profile.create(seed, function(err, profile){
//             if(err){
//                 console.log(err)
//             } else {
//                 console.log("added profile");
//                 console.log(profile);
//                 //create a comment
//                 Art.create(
//                     {
//                        name:"RR",
//                            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s",
//                            likes:3,
//                            type:"Nature"
//                     }, function(err, art){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             profile.art.push(art);
//                             profile.save();
//                             console.log("Created new art");
//                             console.log(art);
//                             console.log(profile);
//                         }
//                     });
//             }
//         });
//     });
// seedDB();
// Art.create({
//     name:"RR",
//     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s",
//     likes:3,
//     type:"Nature"
// },
// function(err, campground){
//           if(err){
//               console.log(err);
//           } else {
//               console.log("NEWLY CREATED : ");
//               console.log(campground);
//           }
//         });

     




// profiles.create({
//     name: "Madhushree",
//     description:"dvs",
//     phone:65763,
//     email:"m@gmail.com",
    
//     function(err, profile){
//           if(err){
//               console.log(err);
//           } else {
//               console.log("NEWLY CREATED : ");
//               console.log(profile);
     
//             }
//     }
// });
// var Art = mongoose.model("Art",artSchema);
var art=[
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSg6AjjMjTP7Pog09YJBq-dOmc7RY9AGGd_oEA3rjCDp5O3B1Ng&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSg6AjjMjTP7Pog09YJBq-dOmc7RY9AGGd_oEA3rjCDp5O3B1Ng&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSg6AjjMjTP7Pog09YJBq-dOmc7RY9AGGd_oEA3rjCDp5O3B1Ng&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s"},
{name:"Rithika",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQSg6AjjMjTP7Pog09YJBq-dOmc7RY9AGGd_oEA3rjCDp5O3B1Ng&s"}
];


app.get("/",function(req,res){
    res.render("main.ejs");
});

app.get("/artopedia/art",function(req,res){
    Art.find({},function(err,allArt){
        if(err){
            console.log(err);
        }
        else{
            console.log(allArt);
            res.render("art.ejs",{art:allArt});
        }
    });
    
});
app.get("/artopedia/poem",function(req,res){
    res.render("poem.ejs");
});
app.get("/artopedia/music",function(req,res){
    res.render("music.ejs");
});
app.get("/artopedia/dance",function(req,res){
    res.render("dance.ejs");
});
app.get("/artopedia/profile",function(req,res){
    res.render("profile.ejs");
})

app.listen(3000,function(req,res){
console.log("Server has started");
});