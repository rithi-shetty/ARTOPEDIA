var express = require("express");
var router  = express.Router();
var Profile = require("../models/profile");
var middleware = require("../middleware"),
methodOverride =require("method-override");
// router.use(methodOverride("_method"));

var ObjectId = require('mongodb').ObjectID;
var multer = require('multer');
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


router.post("/artopedia/profile",upload.single('profile[image]'),function(req,res){
    cloudinary.v2.uploader.upload(req.file.path, 
        function(error, result) {
            console.log(result, error);
  
        req.body.profile.image = result.secure_url;
       
        console.log(result.secure_url);
        // add author to campground
        req.body.profile.author = {
          id: req.user._id,
          username: req.user.username
        }
Profile.create(req.body.profile,function(err,newlyCreated){
    if(err){
        console.log(err);
    }
    else{
        newlyCreated.save();
        console.log(newlyCreated);
        res.redirect("/");
    }
});
}); 
});




router.get("/artopedia/profilee/:id",function(req,res){
    Profile.findById(req.params.id).populate("art").populate("writing").populate("music").populate("dance").exec(function(err,foundProfile){
        if(err){
            console.log(err);
        }else{
            console.log(foundProfile)
            res.render("profilee.ejs",{profile:foundProfile});
        }
    });
});

router.get("/artopedia/profilee/:id/edit",function(req,res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
        }
        else{
            
            res.render("editprofile.ejs",{profile:profile});
        }
    });
});


router.put("/artopedia/profilee/:id/edit", middleware.checkProfileOwnership, function(req, res){
    console.log("Entered");
   Profile.findByIdAndUpdate(req.params.id, req.body.profile, function(err, updatedProfile){
      if(err){
          res.redirect("back");
      } else{
          res.redirect("/artopedia/profilee/" + req.params.id );
      }
   });
});

module.exports = router;