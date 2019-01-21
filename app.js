var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

/* SCHEMA SETUP */
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

/* Model */
var Campground = mongoose.model("Campground", campgroundSchema);

/*
Campground.create({
    name: "Granite Hill", 
    image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
    description: "This is a huge granite hill, no bathrooms, no water. Beautiful granite!"
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created campground: ");
            console.log(campground);
        }
    });
*/

app.get("/", function(request, response){
    response.render("landing");
});

app.get("/campgrounds", function(request, response){
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            response.render("index", {campgrounds: campgrounds});
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
    response.render("new.ejs");
});

// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(request, response){
    // Find the campground with the provided ID
    Campground.findById(request.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // Render show the template with that campground
            response.render("show", {campground: foundCampground});
        }  
    });    
});

app.listen(3000, function(){
    console.log("Yelp Camp server has started");
});