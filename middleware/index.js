var Comment = require("../models/comment");
var Blog    = require("../models/blog");

var middlewareObj = {};
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

middlewareObj.checkOwnershipComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else{
                if(req.user._id.equals(foundComment.author.id)){
                    return next();
                } else{
                    res.redirect("back");
                }
            }
        })
    } else{
        res.redirect("back");
    }
};

middlewareObj.checkOwnershipPost = function(req, res, next){
    if(req.isAuthenticated()){
        if(Blog.findById(req.params.id, function(err, foundBlog) {
            if(err){
                res.redirect("/blogs");
            } else{
                if(req.user._id.equals(foundBlog.author.id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        }));
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;
