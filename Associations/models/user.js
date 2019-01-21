var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });
 /* user model - email, name */ 
 var userSchema = new mongoose.Schema({
    email:String,
    name: String,
    /* list of posts - association */
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }] 
});

var User = mongoose.model("User", userSchema);

module.exports = User;