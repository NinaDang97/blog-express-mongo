var express = require("express");
var router = express.Router({mergeParams: true});
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//---------------COMMENT PART ---------------------------
//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    //find the post by ID
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            var addedComment = {
                text: req.body.text,
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
            };
            Comment.create(addedComment, function(err, newComment){
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

//-----------------
//EDIT ROUTE
//-----------------
//edit form route: /blogs/:id/comments/:comment_id/edit
router.get("/:comment_id/edit", middleware.checkOwnershipComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("commentEdit", {comment: foundComment, blog_id: req.params.id}); 
        }
    });
});

router.put("/:comment_id", middleware.checkOwnershipComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/blogs/" + req.params.id);
       }
  });
});

router.delete("/:comment_id", middleware.checkOwnershipComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    }) 
});

module.exports = router;