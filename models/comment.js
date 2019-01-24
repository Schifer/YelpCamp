var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});

/* comment schema setup */ 
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});
 
module.exports = mongoose.model("Comment", commentSchema);