var express = require("express"),
router      = express.Router(),
Campground  = require("../models/campgrounds"),
middleware  = require("../middleware");


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
router.post("/", middleware.isLoggedIn , function(request, response){
    // response.send("You hit the post route.");
    var name = request.body.name;
    var image = request.body.image;
    var desc = request.body.description;
    var author = {
        id: request.user._id,
        username: request.user.username
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
router.get("/new", middleware.isLoggedIn, function(request, response){
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

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
    // Find and update the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            // redirect to somewhere
            res.redirect("/campgrounds/" + req.params.id);
        }
    })   
});

// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;