var express = require("express");
var router  = express.Router({mergeParams: true});
var Profile = require("../models/profile");
var Art = require("../models/art");
var middleware = require("../middleware");
var multer = require('multer'),
methodOverride =require("method-override");
// router.use(methodOverride("_method"));

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'madhuny', 
  api_key: 678976154341127, 
  api_secret: 'ZjSXMTbxoP_xuOtEe9hNufH2Q6M'
});

//Category Art from main page
router.get("/artopedia/art",middleware.isLoggedIn,function(req,res){
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            var allArt;
            Art.find({},function(err,allArt){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allArt);
            res.render("art.ejs",{art:allArt,profile:allProfile});
            }
        }).sort({'_id':-1});
        }
});
});
//Different category
router.get("/artopedia/art/:category",function(req,res){
    
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.category);
            Art.find({"category":req.params.category},function(err,allArt){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allArt);
            res.render("art.ejs",{art:allArt,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});


//Add new 
router.get("/artopedia/profilee/:id/art/new",function(req,res){
   
    Profile.findById(req.params.id,function(err,profile){
        if(err){
            console.log(err);
        }
        else{
            res.render("newPost.ejs",{profile:profile});
        }
    });
});

router.post("/artopedia/profilee/:id/art", middleware.checkProfileOwnership,upload.single('art[image]'),function(req,res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            cloudinary.v2.uploader.upload(req.file.path, 
                function(error, result) {console.log(result, error)
            // cloudinary.uploader.upload(req.file.path, function(result) {
                // add cloudinary url for the image to the campground object under image property
                req.body.art.image = result.secure_url;
                console.log(result.secure_url);
                // add author to campground
                req.body.art.author = {
                  id: req.user._id,
                  username: req.user.username
                }
         Art.create(req.body.art, function(err, art){
            //  console.log(req.body.art);
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
        });
        }
    });
});


//Edit 
router.get("/artopedia/profilee/:id/art/:art_id/edit",middleware.checkProfileOwnership, function(req, res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            Art.findById(req.params.art_id, function(err, foundArt){
                if(err){
                    res.redirect("back");
                } else {
                    res.render("edit.ejs", {profile: profile, art: foundArt});
                        }
            });
        }
    });
});
 

 router.put("/artopedia/profilee/:id/art/:art_id", middleware.checkProfileOwnership, function(req, res){
     console.log("Entered");
    Art.findByIdAndUpdate(req.params.art_id, req.body.art, function(err, updatedArt){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/artopedia/profilee/" + req.params.id );
       }
    });
 });


 
 // delete
 router.delete("/artopedia/profilee/:id/art/:art_id", middleware.checkProfileOwnership,function(req, res){
    //findByIdAndRemove
    Art.findByIdAndRemove(req.params.art_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // req.flash("success", "Post deleted");
           res.redirect("/artopedia/profilee/" + req.params.id);
       }
    });
});


module.exports = router;