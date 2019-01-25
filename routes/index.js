var express     = require("express"),
    router      = express.Router();
    passport    = require("passport");
    User        = require("../models/user");

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
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
