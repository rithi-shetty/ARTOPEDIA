var mongoose = require("mongoose");
var musicSchema=new mongoose.Schema({
    name: String,
    video: String,
    likes:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likesCount: Number,
    category: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});



module.exports = mongoose.model("Music", musicSchema);