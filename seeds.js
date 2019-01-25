var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa mauris, porttitor ac ex vel, tincidunt sagittis sem. Integer a faucibus erat. Curabitur tincidunt arcu in lorem lobortis, ut efficitur nunc tempus. Aenean vitae sollicitudin turpis, nec tempor orci. Aliquam vitae dignissim ipsum, quis ullamcorper est. Aliquam erat volutpat. Integer tristique libero eu imperdiet tincidunt. Sed gravida ullamcorper sem vitae faucibus. Nulla consectetur tellus elementum pharetra aliquam. Curabitur consectetur sollicitudin venenatis. Quisque a lacinia enim. Fusce blandit nisl non magna pellentesque, vel mattis diam varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam accumsan nunc a dictum blandit." 
    },
    {
        name: "Sage's River",
        image: "https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa mauris, porttitor ac ex vel, tincidunt sagittis sem. Integer a faucibus erat. Curabitur tincidunt arcu in lorem lobortis, ut efficitur nunc tempus. Aenean vitae sollicitudin turpis, nec tempor orci. Aliquam vitae dignissim ipsum, quis ullamcorper est. Aliquam erat volutpat. Integer tristique libero eu imperdiet tincidunt. Sed gravida ullamcorper sem vitae faucibus. Nulla consectetur tellus elementum pharetra aliquam. Curabitur consectetur sollicitudin venenatis. Quisque a lacinia enim. Fusce blandit nisl non magna pellentesque, vel mattis diam varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam accumsan nunc a dictum blandit." 
    },
    {
        name: "Night Eye Watch",
        image: "https://images.unsplash.com/photo-1488682371245-58436e0dc611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa mauris, porttitor ac ex vel, tincidunt sagittis sem. Integer a faucibus erat. Curabitur tincidunt arcu in lorem lobortis, ut efficitur nunc tempus. Aenean vitae sollicitudin turpis, nec tempor orci. Aliquam vitae dignissim ipsum, quis ullamcorper est. Aliquam erat volutpat. Integer tristique libero eu imperdiet tincidunt. Sed gravida ullamcorper sem vitae faucibus. Nulla consectetur tellus elementum pharetra aliquam. Curabitur consectetur sollicitudin venenatis. Quisque a lacinia enim. Fusce blandit nisl non magna pellentesque, vel mattis diam varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam accumsan nunc a dictum blandit." 
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

    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a campground.");
                
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
    

