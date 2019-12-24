var mongoose = require("mongoose");

var profileSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    phone:Number,
    email:String,
    author: {
       id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       },
       username:String
    },
    art:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Art"
        }
    ]
});
module.exports=mongoose.model("Profile",profileSchema);