var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author: String,
    date: {type: Date, default: Date.now},
    text: String
});

module.exports = mongoose.model("Comment", commentSchema);