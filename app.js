var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
    {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"},
    {name: "Granite Hill", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"}
];


app.get("/", function(request, response){
    response.render("landing");
});

app.get("/campgrounds", function(request, response){
    response.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(request, response){
    response.send("You hit the post route.");

    var name = request.body.name;
    var image = request.body.image;
    var new_campground = {name: name,
    image: image}
    campgrounds.push(new_campground);
    response.redirect("/campgrounds");
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
});

app.get("/campgrounds/new", function(request, response){
    response.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Yelp Camp server has started");
});