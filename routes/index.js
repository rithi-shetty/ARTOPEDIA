var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user"),
methodOverride =require("method-override");
// router.use(methodOverride("_method"));
router.get("/",function(req,res){
    
    Profile.find({},function(err,allProfiles){
        if(err){
            console.log(err);
        }else{
            res.render("main.ejs",{profile:allProfiles});
        }
    })
   
});

router.get("/artopedia/profile",function(req,res){
    res.render("profile.ejs");
});


router.get("/artopedia/register",function(req,res){
    res.render("signup.ejs");
});
router.post("/artopedia/register",function(req,res){
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
router.get("/artopedia/login",function(req,res){
res.render("login.ejs");
});
router.post("/artopedia/login",passport.authenticate("local",
{
successRedirect:"/",
failureRedirect:"/artopedia/login"
}),function(req,res){
    Profile.find({author:{id:currentUser._id,username:currentUser.username}},function(err,profile){ 
       console.log(currentUser._id)
       id = profile.id; 
     });
});

router.get("/artopedia/about",function(req,res){
    res.render("about.ejs");
});

router.get("/artopedia/contact",function(req,res){
    res.render("contact.ejs");
});
router.get("/artopedia/logout",function(req,res){
    req.logout();
    // req.flash("success","Logged out ");
    res.redirect("/");
});

module.exports = router;