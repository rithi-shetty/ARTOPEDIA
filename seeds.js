var mongoose=require("mongoose");
Profile  = require("./models/profile.js"),
Art     = require("./models/art.js");


var data=[{name: "Madhushree",
    description:"dvs",
    phone:65763,
    email:"m@gmail.com"}];

function seedDB(){
  
          //add a few campgrounds
         data.forEach(function(seed){
             Profile.create(seed, function(err, profile){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added profile");
                     console.log(profile);
                     //create a comment
                     Art.create(
                         {
                            name:"RR",
                                image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-RH9O4PgcNwkAsFZx55dn48ENTBRiJ1XHilOojEggS0-_x1jpg&s",
                                likes:3,
                                type:"Nature"
                         }, function(err, art){
                             if(err){
                                 console.log(err);
                             } else {
                                 profile.arts.push(art);
                                 profile.save();
                                 console.log("Created new art");
                                 console.log(art);
                                 console.log(profile);
                             }
                         });
                 }
             });
         });
        }
 module.export=seedDB;