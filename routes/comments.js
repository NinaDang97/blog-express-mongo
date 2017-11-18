var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");

//---------------COMMENT PART ---------------------------
//CREATE ROUTE
router.post("/:id/comments", isLoggedIn, function(req, res){
    //find the post by ID
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                } else{
                    foundBlog.comments.push(newComment);
                    foundBlog.save();
                    res.redirect("/blogs/" + req.params.id);
                }
            })
        }
    })
});

//add middleware isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;