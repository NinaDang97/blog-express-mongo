var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);