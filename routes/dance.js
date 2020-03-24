var express = require("express");
var router  = express.Router({mergeParams: true});
var Profile = require("../models/profile");
var Dance = require("../models/dance");
var middleware = require("../middleware"),
methodOverride =require("method-override");
var ObjectId = require('mongodb').ObjectID;

// router.use(methodOverride("_method"));

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});



var videoFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(mp4)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var uploadv = multer({ storage: storage, fileFilter: videoFilter});


var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'madhuny', 
  api_key: 678976154341127, 
  api_secret: 'ZjSXMTbxoP_xuOtEe9hNufH2Q6M'
});

//from main page
router.get("/artopedia/dance",middleware.isLoggedIn,function(req,res){
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            Dance.find({},function(err,allDance){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allDance);
            res.render("dance.ejs",{dance:allDance,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});

//different category
router.get("/artopedia/dance/:category",function(req,res){
    
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.category);
            Dance.find({"category":req.params.category},function(err,allDance){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allDance);
            res.render("dance.ejs",{dance:allDance,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});


//Add post
router.get("/artopedia/profilee/:id/dance/new",function(req,res){
   
    Profile.findById(req.params.id,function(err,profile){
        if(err){
            console.log(err);
        }
        else{
            res.render("newPost.ejs",{profile:profile});
        }
    });
});

router.post("/artopedia/profilee/:id/dance", middleware.checkProfileOwnership,uploadv.single('dance[video]'),function(req,res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            cloudinary.v2.uploader.upload(req.file.path,{resource_type:"video"} ,
                function(error, result) {console.log(result, error)
            // cloudinary.uploader.upload(req.file.path, function(result) {
                // add cloudinary url for the image to the campground object under image property
                req.body.dance.video = result.secure_url;
                console.log(result.secure_url);
                // add author to campground
                req.body.dance.author = {
                  id: req.user._id,
                  username: req.user.username
                }
        Dance.create(req.body.dance, function(err, dance){
            //  console.log(req.body.art);
            if(err){
                // req.flash("error", "Something went wrong");
                console.log(err);
            } else {
                //add username and id to comment
                dance.author.id = req.user._id;
                dance.author.username = req.user.username;

                //save comment
                dance.save();
                profile.dance.push(dance);
                profile.save();
                console.log(dance);
                // req.flash("success", "Successfully added comment");
                res.redirect("/artopedia/profilee/" + req.params.id);
            }
         });
        });
        }
    });
});

//Edit 
router.get("/artopedia/profilee/:id/dance/:dance_id/edit",middleware.checkProfileOwnership, function(req, res){
    Profile.findById(ObjectId(req.params.id), function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            Dance.findById(req.params.dance_id, function(err, foundDance){
                if(err){
                    res.redirect("back");
                } else {
                    res.render("edit.ejs", {profile: profile, dance: foundDance});
                        }
            });
        }
    });
});
 

 router.put("/artopedia/profilee/:id/dance/:dance_id", middleware.checkProfileOwnership, function(req, res){
     console.log("Entered");
   Dance.findByIdAndUpdate(req.params.dance_id, req.body.dance, function(err, updatedDance){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/artopedia/profilee/" + req.params.id );
       }
    });
 });


 
 // delete
 router.delete("/artopedia/profilee/:id/dance/:dance_id", middleware.checkProfileOwnership,function(req, res){
    //findByIdAndRemove
    Dance.findByIdAndRemove(req.params.dance_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // req.flash("success", "Post deleted");
           res.redirect("/artopedia/profilee/" + ObjectId(req.params.id));
       }
    });
});
module.exports = router;

