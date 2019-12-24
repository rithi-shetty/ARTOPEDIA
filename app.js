var express=require('express');
var app=express();
var mongoose=require('mongoose');
var passport = require ("passport");
var LocalStrategy=require("passport-local");
var bodyParser = require("body-parser");
Profile        = require("./models/profile.js"),
Art            = require("./models/art.js"),
User           = require("./models/user.js"),
seedDB         = require("./seeds.js");

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
    
    Profile.find({},function(err,allProfiles){
        if(err){
            console.log(err);
        }else{
            res.render("main.ejs",{profile:allProfiles});
        }
    })
   
});

app.get("/artopedia/art",function(req,res){
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            Art.find({},function(err,allArt){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allArt);
            res.render("art.ejs",{art:allArt,profile:allProfile});
                }
        });
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
//Shows user profile
app.get("/artopedia/profilee",function(req,res){
    res.render("profilee.ejs");
});
//Form to submit along with sign up
app.get("/artopedia/profile",function(req,res){
    res.render("profile.ejs");
});
app.post("/artopedia/profile",function(req,res){
    var name = req.body.name;
    var image= req.body.image;
    var description = req.body.description;
    var email= req.body.email;
    var phone=req.body.phone;
    var author={
        id:req.user._id,
        username:req.user.username
    }
var newProfile = {name:name,image:image,description:description,email:email,phone:phone,author:author}
Profile.create(newProfile,function(err,newlyCreated){
    if(err){
        console.log(err);
    }
    else{
        console.log(newlyCreated);
        res.redirect("/");
    }
})
});

app.get("/artopedia/register",function(req,res){
    res.render("signup.ejs");
});
app.post("/artopedia/register",function(req,res){
    var newUser = new User ({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            // req.flash("error",err.message);
            return res.render("signup.ejs");
        }
        passport.authenticate("local")(req,res,function(){
            // req.flash("Success","Welcome"+user.username);
            res.redirect("/artopedia/profile")
        })
    })
});
app.get("/artopedia/login",function(req,res){
res.render("login.ejs");
});
app.post("/artopedia/login",passport.authenticate("local",
{
successRedirect:"/",
failureRedirect:"/artopedia/login"
}),function(req,res){
});

app.get("/artopedia/logout",function(req,res){
    req.logout();
    // req.flash("success","Logged out ");
    res.redirect("/");
});

app.get("/artopedia/profilee/:id",function(req,res){
    Profile.findById(req.params.id).populate("art").exec(function(err,foundProfile){
        if(err){
            console.log(err);
        }else{
            console.log(foundProfile)
            res.render("profilee.ejs",{profile:foundProfile});
        }
    });
});

app.get("/artopedia/profilee/:id/art/new",function(req,res){
   
    Profile.findById(req.params.id,function(err,profile){
        if(err){
            console.log(err);
        }
        else{
            res.render("newArt.ejs",{profile:profile});
        }
    });
});

app.post("/artopedia/profilee/:id/art",function(req,res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
         Art.create(req.body.art, function(err, art){
             console.log(req.body.art);
            if(err){
                // req.flash("error", "Something went wrong");
                console.log(err);
            } else {
                //add username and id to comment
                art.author.id = req.user._id;
                art.author.username = req.user.username;

                //save comment
                art.save();
                profile.art.push(art);
                profile.save();
                console.log(art);
                // req.flash("success", "Successfully added comment");
                res.redirect("/artopedia/profilee/" + req.params.id);
            }
         });
        }
    });
});
app.listen(3000,function(req,res){
console.log("Server has started");
});