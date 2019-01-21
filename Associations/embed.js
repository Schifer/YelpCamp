var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

 /* post model - title, content */
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})

var Post = mongoose.model("Post", postSchema);

 /* user model - email, name */ 
 var userSchema = new mongoose.Schema({
    email:String,
    name: String,
    /* list of posts - association */
    posts: [postSchema] /* This must be define after the postChema definition !!! */ 
});

var User = mongoose.model("User", userSchema);

User.findOne({name: "Schifer"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "Samsung",
            content: "Samsung galaxy is good!"
        });
        
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});
/*
var newUser = new User({
    email: "Schifer@gmail.com",
    name: "Schifer"
});

 // Adding a post to a user 

newUser.posts.push({
    title: "diamond players",
    content: "diamomnd players sucks"
})

newUser.save(function(err, user){
   if(err){
       console.log(err);
   } else {
       console.log(user);
   }
});
*/
/*
var newUser = new User({
    email: "ryu@brown.edu",
    name: "RyuJehong"
});
newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

var NewPost = new Post({
   title: "New nanatsu no taizai chapter",
   content: "It's fucking lit!!!"
});
NewPost.save(function(err, post){
    if(err){
        console.log(err);
    } else {
        console.log(post);
    }
});

app.listen(3000, function(){
    console.log("Animals blog server has started!");
});
*/