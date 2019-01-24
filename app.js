var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var Campground      = require("./models/campgrounds");
var Comment         = require("./models/comment");
var User            = require("./models/user");
var seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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

/* routes*/ 

app.get("/", function(request, response){
    response.render("landing");
});

app.get("/campgrounds", function(request, response){
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(request, response){
    // response.send("You hit the post route.");
    var name = request.body.name;
    var image = request.body.image;
    var desc = request.body.description;

    var new_campground = {
        name: name,
        image: image,
        description: desc}
    // Create a new campground and save to the database
    Campground.create(new_campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            response.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(request, response){
    response.render("campgrounds/new");
});

// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(request, response){
    // Find the campground with the provided ID
    Campground.findById(request.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // Render show the template with that campground
            response.render("campgrounds/show", {campground: foundCampground});
        }  
    });    
});

/* ======================
    Comments routes */ 
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else { 
                    campground.comments.push(comment);
                    campground.save();
                    // /campgrounds/:id
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            // connect new comment to campground
            // redirect to campground show page
        }
    });  
});

/* ============ */ 
/* Auth routes */ 
/* ========== */
app.get("/register", function(req, res){
    res.render("register");
});

/* Handle sign up logic */ 
app.post("/register", function(req, res){
    // res.send("signing you up...");
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

/* Show login form */ 
app.get("/login", function(req, res){
    res.render("login");
});

/* Handle log in logic */ 
app.post("/login", passport.authenticate("local", // middleware: app.post("/login", middlware, callback);
 {
     successRedirect: "/campgrounds",
     failureRedirect: "/login" }), function(req, res){ 
});

/* Logic route */
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Yelp Camp server has started");
});