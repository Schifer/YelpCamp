var express             = require("express"),
mongoose                = require("mongoose"),
body_parser             = require("body-parser"),
passport                = require("passport"),
localStrat              = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose"),
User                    = require("./models/user");

mongoose.connect("mongodb://localhost:27017/authdemo_app", { useNewUrlParser: true});

var app = express();
app.use(require("express-session")({ // Requiring inline 
    secret: "Escanor is the best",
    resave: false,
    saveUninitialized: false
})); 
app.use(body_parser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

/* Reading the session, taking the data from the session, deserializing it, 
and putting it back on session */ 
passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* =============
     Routes 
 ================   */

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

app.get("/register", function(req, res){
    // Show SignUp form
    res.render("register");
});

app.post("/register", function(req, res){
    // Getting the register.ejs form data
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        // We don't save the password on data base: its a bad idea.
        if(err){
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function(){ 
                // Log the user in with the LOCAL strategy
                res.redirect("secret");
            });
        }
    });
});

/* Login routes */ 
app.get("/login", function(req, res){
    res.render("login");
});

// Login logic

/* middleware */
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) , function(req, res){
});

// Logout

app.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("SERVER STARTED");
});