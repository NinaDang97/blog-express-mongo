var mongoose = require("mongoose");

//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }]
});
var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;