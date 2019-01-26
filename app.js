var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var methodOverride  = require("method-override");
var Campground      = require("./models/campgrounds");
var Comment         = require("./models/comment");
var User            = require("./models/user");
var seedDB          = require("./seeds");

// requering routes
var commentRoutes = require("./routes/comments"),
campgroundsRoutes = require("./routes/campgrounds"),
indexRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
/* seed the database */ 
//seedDB(); 

/* Passport configuration */
app.use(require("express-session")({
    secret: "Once again!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){ // Middleware for every single route
    res.locals.currentUser = req.user;
    next();
});

/* Routes */ 
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function(){
    console.log("Yelp Camp server has started");
});