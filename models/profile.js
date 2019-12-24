var mongoose = require("mongoose");

var profileSchema=new mongoose.Schema({
    name:String,
    description:String,
    phone:Number,
    email:String,
    // author: {
    //    id:{
    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: "User"
    //    }
    // },
    art:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Art"
        }
    ]
});
module.exports=mongoose.model("Profile",profileSchema);