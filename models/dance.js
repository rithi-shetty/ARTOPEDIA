var mongoose = require("mongoose");
var danceSchema=new mongoose.Schema({
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
    }
});



module.exports = mongoose.model("Dance", danceSchema);