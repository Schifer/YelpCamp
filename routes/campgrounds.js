var express = require("express"),
router      = express.Router();

/* INDEX Show all campgrounds */ 
router.get("/", function(request, response){
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            response.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

// CREATE - add new campground to db
router.post("/", isLoggedIn, function(request, response){
    // response.send("You hit the post route.");
    var name = request.body.name;
    var image = request.body.image;
    var desc = request.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var new_campground = {
        name: name,
        image: image,
        description: desc,
        author: author
    }
    // Create a new campground and save to the database
    Campground.create(new_campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            response.redirect("/campgrounds");
        }
    });
});

// NEW - Show form to create new campground
router.get("/new", isLoggedIn, function(request, response){
    response.render("campgrounds/new");
});

// SHOW - Shows more info about one campground
router.get("/:id", function(request, response){
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

function isLoggedIn(req, res, next){ // middleware
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;