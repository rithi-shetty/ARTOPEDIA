var express = require("express");
var router  = express.Router({mergeParams: true});
var Profile = require("../models/profile");
var Writing = require("../models/writing");
var middleware = require("../middleware"),
methodOverride =require("method-override");
// router.use(methodOverride("_method"));

router.get("/artopedia/writing",middleware.isLoggedIn,function(req,res){
   
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            Writing.find({},function(err,allWriting){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allWriting);
            res.render("writing.ejs",{writing:allWriting,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});

router.get("/artopedia/writing/:category",function(req,res){
    
    Profile.find({},function(err,allProfile){
        if(err){
            console.log(err);
        }
        else{
            console.log(req.params.category);
            Writing.find({"category":req.params.category},function(err,allWriting){
                if(err){
                    console.log(err);
                }
                else{
            console.log(allWriting);
            res.render("writing.ejs",{writing:allWriting,profile:allProfile});
                }
        }).sort({'_id':-1});
    }
});
});


router.post("/artopedia/profilee/:id/writing", middleware.checkProfileOwnership,function(req,res){
    Profile.findById(req.params.id, function(err, profile){
       
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
         Writing.create(req.body.writing, function(err, writing){
             console.log(req.body.writing);
            if(err){
                // req.flash("error", "Something went wrong");
                console.log(err);
            } else {
                //add username and id to comment
                writing.author.id = req.user._id;
                writing.author.username = req.user.username;

                //save comment
                writing.save();
                profile.writing.push(writing);
                profile.save();
                console.log(writing);
                // req.flash("success", "Successfully added comment");
                res.redirect("/artopedia/profilee/" + req.params.id);
            }
         });
        }
    });
});

router.get("/artopedia/profilee/:id/writing/:writing_id/edit",middleware.checkProfileOwnership, function(req, res){
    Profile.findById(req.params.id, function(err, profile){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            Writing.findById(req.params.writing_id, function(err, foundWriting){
                if(err){
                    res.redirect("back");
                } else {
                    res.render("edit.ejs", {profile: profile, writing: foundWriting});
                        }
            });
        }
    });
});
 
 // COMMENT UPDATE
 router.put("/artopedia/profilee/:id/writing/:writing_id", middleware.checkProfileOwnership, function(req, res){
     console.log(req.params.writing_id);
    Writing.findByIdAndUpdate(req.params.writing_id, req.body.writing, function(err, updatedWriting){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/artopedia/profilee/" + req.params.id );
       }
    });
 });
 ///////////////////////////////////////////



  // COMMENT DESTROY ROUTE
  router.delete("/artopedia/profilee/:id/writing/:writing_id", middleware.checkProfileOwnership,function(req, res){
    //findByIdAndRemove
    Writing.findByIdAndRemove(req.params.writing_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // req.flash("success", "Post deleted");
           res.redirect("/artopedia/profilee/" + req.params.id);
       }
    });
});

router.get("/artopedia/writing/big/:id",function(req,res){
    Writing.findById(req.params.id,function(err,writing){
        if(err){
            console.log(err);
        }
        else{
            res.render("wbig.ejs",{writing:writing});
        }
    });

});


module.exports = router;