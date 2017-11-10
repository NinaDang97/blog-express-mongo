var bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    express             = require("express"),
    app                 = express(),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Blog                = require("./models/blog"),
    Comment             = require("./models/comment"),
    User                = require("./models/user");
    
//App Config
mongoose.connect("mongodb://localhost/blog_app");
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer()); //this code MUST BE BEFORE bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Passport Config
app.use(require("express-session")({
    secret: "This blog is made by most beautiful puppy",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//This is middleware
//pass req.user to every single template EJS
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next(); //without next(), it stops and doesn't move to next middleware/route handler
});

//Restful Route
app.get("/", function(req, res){
    res.redirect("blogs");
})

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {allBlogs: blogs, currentUser: req.user});
        }
    })
});

//NEW ROUTE
app.get("/blogs/new", isLoggedIn, function(req, res){
    res.render("new"); 
});

//CREATE ROUTE
app.post("/blogs", isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            //redirect to index
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
//=======================SHOW COMMENT REFERENCE BY POPULATE.EXEC =============
//=======================================================================
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("show", {blog: foundBlog});
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//PUT ROUTE
app.put("/blogs/:id", isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //Blog.findByIdAndUpdate(id, new data, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id/comments", isLoggedIn, function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            //redirect
            res.redirect("/blogs");
        }
    });
})

//---------------COMMENT PART ---------------------------
//CREATE ROUTE
app.post("/blogs/:id/comments", isLoggedIn, function(req, res){
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
})

// ==========================================
//              AUTH ROUTES
// ==========================================
//REGISTER
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    console.log(req.body.username);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       } 
       passport.authenticate("local")(req, res, function(){
           res.redirect("/blogs");
       });
    });
});

//LOGIN
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login"
}), function(req, res) {
});

//LOGOUT
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/blogs");
});

//add middleware isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS STARTED");
})
