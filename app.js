const express         = require("express");
const app             = express();
const bodyParser      = require("body-parser");
const mongoose        = require("mongoose");
const flash           = require("connect-flash");
const passport        = require("passport");
const LocalStrategy   = require("passport-local");
const methodOverride  = require("method-override");
const Campground      = require("./models/campgrounds");
const Comment         = require("./models/comment");
const User            = require("./models/user");
const seedDB          = require("./seeds");

// requering routes
const commentRoutes = require("./routes/comments"),
reviewRoutes     = require("./routes/reviews"),
campgroundsRoutes = require("./routes/campgrounds"),
indexRoutes       = require("./routes/index");


//mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true}); // Local database code
mongoose.connect("mongodb://admin1:admin1@ds153314.mlab.com:53314/yelpcampb", { useNewUrlParser: true}); // heroku database code mlab
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
/* seed the database 
seedDB(); 
*/ 

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
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

/* Routes */ 
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

/* When using heroku  */
const port = process.env.PORT || 80;

app.listen(port, function(){
    console.log("Yelp Camp server has started");
});


/* When using localhost 

app.listen(3000, function(){
    console.log("Yelp Camp server has started");
});

*/ 

Campground.deleteOne({"author":"Chad"});