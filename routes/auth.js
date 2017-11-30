var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ==========================================
//              AUTH ROUTES
// ==========================================
//REGISTER
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    console.log(req.body.username);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register", {error: err.message});
       } 
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to blog site, " + user.username + "!");
           res.redirect("/blogs");
       });
    });
});

//LOGIN
router.get("/login", function(req, res) {
    res.render("login", {message: req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req, res) {
});

//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have logged out your session.");
    res.redirect("/blogs");
});

module.exports = router;