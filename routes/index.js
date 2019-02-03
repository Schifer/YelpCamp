var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Campground  = require('../models/campgrounds');


// Root route
router.get("/", function(request, response){
    response.render("landing");
});

/* ============ */ 
/* Auth routes */ 
/* ========== */
// Show register form
router.get("/register", function(req, res){
    res.render("register");
});

/* Handle sign up logic */ 
router.post("/register", function(req, res){
    // res.send("signing you up...");
    var newUser = new User({username: req.body.username, 
        firstName:  req.body.firstName,
        lastName:   req.body.lastName,
        email:      req.body.email,
        avatar:     req.body.avatar
    });

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username + " .");
                res.redirect("/campgrounds");
            });
        }
    });
});

/* Show login form */ 
router.get("/login", function(req, res){
    res.render("login");
});

/* Handle log in logic */ 
router.post("/login", passport.authenticate("local", // middleware: app.post("/login", middlware, callback);
 {
     successRedirect: "/campgrounds",
     failureRedirect: "/login" }), function(req, res){ 
});

/* Logic route - logout route*/
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

/* Users Profiles */
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash('error', 'Something went wrong');
            res.redirect('/');
        }else{
            Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
                if(err) {
                  req.flash("error", "Something went wrong.");
                  return res.redirect("/");
                }
                res.render("users/show", {user: foundUser, campgrounds: campgrounds});
              }); 
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
