var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Beautiful place to stay." 
    },
    {
        name: "Sage's River",
        image: "https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa mauris, porttitor ac ex vel, tincidunt sagittis sem. Integer a faucibus erat. Curabitur tincidunt arcu in lorem lobortis, ut efficitur nunc tempus." 
    },
    {
        name: "Night Eye Watch",
        image: "https://images.unsplash.com/photo-1488682371245-58436e0dc611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa mauris, porttitor ac ex vel, tincidunt sagittis sem. Integer a faucibus erat. Curabitur tincidunt arcu in lorem lobortis, ut efficitur nunc tempus." 
    }
]

function seedDB(){
    /* remove all campgrounds */ 
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed campgrounds.");
        }   
    });

    /* add a few campgrounds */
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a campground.");
                /* add a few comments */ 
                Comment.create({
                    text: "This place is great, but I wish there was internet :)",
                    author: "Shiso"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a new comment.");
                    }
                });
            }
        });
    });    
}

module.exports = seedDB;
    

