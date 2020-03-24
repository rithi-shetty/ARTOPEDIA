var express = require("express");
var router  = express.Router({mergeParams: true});
var Profile = require("../models/profile");
var Music = require("../models/music");
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
router.get("/artopedia/music",middleware.isLoggedIn,function(req,res){
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            Music.find({},function(err,allMusic){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allMusic);
            res.render("music.ejs",{music:allMusic,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});

//different category
router.get("/artopedia/music/:category",function(req,res){
    
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.category);
            Music.find({"category":req.params.category},function(err,allMusic){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allMusic);
            res.render("music.ejs",{music:allMusic,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});


//Add post
router.get("/artopedia/profilee/:id/music/new",function(req,res){
   
    Profile.findById(req.params.id,function(err,profile){
        if(err){
            console.log(err);
        }
        else{
            res.render("newPost.ejs",{profile:profile});
        }
    });
});

router.post("/artopedia/profilee/:id/music", middleware.checkProfileOwnership,uploadv.single('music[video]'),function(req,res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            cloudinary.v2.uploader.upload(req.file.path,{resource_type:"video"} ,
                function(error, result) {console.log(result, error)
            // cloudinary.uploader.upload(req.file.path, function(result) {
                // add cloudinary url for the image to the campground object under image property
                req.body.music.video = result.secure_url;
                console.log(result.secure_url);
                // add author to campground
                req.body.music.author = {
                  id: req.user._id,
                  username: req.user.username
                }
        Music.create(req.body.music, function(err, music){
            //  console.log(req.body.art);
            if(err){
                // req.flash("error", "Something went wrong");
                console.log(err);
            } else {
                //add username and id to comment
                music.author.id = req.user._id;
                music.author.username = req.user.username;

                //save comment
                music.save();
                profile.music.push(music);
                profile.save();
                console.log(music);
                // req.flash("success", "Successfully added comment");
                res.redirect("/artopedia/profilee/" + req.params.id);
            }
         });
        });
        }
    });
});

//Edit 
router.get("/artopedia/profilee/:id/music/:music_id/edit",middleware.checkProfileOwnership, function(req, res){
    Profile.findById(ObjectId(req.params.id), function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            Music.findById(req.params.music_id, function(err, foundMusic){
                if(err){
                    res.redirect("back");
                } else {
                    res.render("edit.ejs", {profile: profile, music: foundMusic});
                        }
            });
        }
    });
});
 

 router.put("/artopedia/profilee/:id/music/:music_id", middleware.checkProfileOwnership, function(req, res){
     console.log("Entered");
   Music.findByIdAndUpdate(req.params.music_id, req.body.music, function(err, updatedMusic){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/artopedia/profilee/" + req.params.id );
       }
    });
 });


 
 // delete
 router.delete("/artopedia/profilee/:id/music/:music_id", middleware.checkProfileOwnership,function(req, res){
    //findByIdAndRemove
    Music.findByIdAndRemove(req.params.music_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // req.flash("success", "Post deleted");
           res.redirect("/artopedia/profilee/" + ObjectId(req.params.id));
       }
    });
});
module.exports = router;

