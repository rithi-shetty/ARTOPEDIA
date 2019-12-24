var mongoose = require("mongoose");
var artSchema=new mongoose.Schema({
    name: String,
    image: String,
    likes: Number,
    category: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});



module.exports = mongoose.model("Art", artSchema);