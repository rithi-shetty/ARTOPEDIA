var mongoose = require("mongoose");
var artSchema=new mongoose.Schema({
    name: String,
    image: String,
    likes: Number,
    type: String,
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     }
    // }
});



module.exports = mongoose.model("Art", artSchema);