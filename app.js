var bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    express             = require("express"),
    app                 = express(),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Blog                = require("./models/blog"),
    Comment             = require("./models/comment"),
    User                = require("./models/user");

//Require Route Root
var authRoutes = require("./routes/auth");
var blogRoutes = require("./routes/blogs");
var commentRoutes = require("./routes/comments");
    
//App Config
mongoose.connect("mongodb://localhost/blog_site", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer()); //this code MUST BE BEFORE bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); //without next(), it stops and doesn't move to next middleware/route handler
});

//REQUIRE ROUTES
app.use(authRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);

//Restful Route
app.get("/", function(req, res){
    res.redirect("blogs");
});

//In cloud9
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS STARTED");
})
//Otherwise run locally
// app.listen(3000, function(){
//     console.log("SERVER IS STARTED");
// })
