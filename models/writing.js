var mongoose = require("mongoose");
var writingSchema=new mongoose.Schema({
    name: String,
    writing : String,
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



module.exports = mongoose.model("Writing", writingSchema);