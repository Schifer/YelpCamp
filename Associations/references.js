var mongoose = require("mongoose");
var Post = require("./models/post.js");
var User = require("./models/user.js");

mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

Post.create({
    title: "How to cook stuff",
    content: "protip: use fire"
}, function(err, post){
    User.findOne({email: "edu@gmail.com"}, function(err, foundUser){
       if(err){
           console.log(err);
       } else {
           foundUser.posts.push(post);
           foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
           });
       }
    });
});