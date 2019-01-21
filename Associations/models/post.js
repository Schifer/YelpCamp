var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);