var mongoose = require("mongoose");

var profileSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    phone:Number,
    email:String,
    category:String,
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
    ],
    writing:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Writing"
        }
    ],
    music:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Music"
        }
    ],
    dance:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Dance"
        }
    ]
    
});
module.exports=mongoose.model("Profile",profileSchema);