var express = require("express");
var router = express.Router({mergeParams: true});
var Blog = require("../models/blog");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {allBlogs: blogs, currentUser: req.user});
        }
    })
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("new"); 
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            newBlog.author.id = req.user._id;
            newBlog.author.username = req.user.username;
            newBlog.save();
            
            //redirect to index
            req.flash("success", "Your blog " + newBlog.title + " is successfully added!");
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
//=======================SHOW COMMENT REFERENCE BY POPULATE.EXEC =============
//=======================================================================
router.get("/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("show", {blog: foundBlog});
        }
    })
})

//EDIT ROUTE
router.get("/:id/edit", middleware.checkOwnershipPost, function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//PUT ROUTE
router.put("/:id", middleware.checkOwnershipPost, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //Blog.findByIdAndUpdate(id, new data, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            req.flash("success", "Your blog " + updatedBlog.title + " is successfully updated!");
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id", middleware.checkOwnershipPost, function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            //redirect
            res.redirect("/blogs");
        }
    });
});

// //add middleware isLoggedIn
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

// //add another middleware for checking authorization
// function checkOwnershipPost(req, res, next){
//     if(req.isAuthenticated()){
//         if(Blog.findById(req.params.id, function(err, foundBlog) {
//             if(err){
//                 res.redirect("/blogs");
//             } else{
//                 if(req.user._id.equals(foundBlog.author.id)){
//                     next();
//                 } else{
//                     res.redirect("back");
//                 }
//             }
//         }));
//     } else {
//         res.redirect("back");
//     }
// }

module.exports = router;