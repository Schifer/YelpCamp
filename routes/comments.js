var express     = require("express"),
    router      = express.Router({mergeParams: true});
    Campground  = require("../models/campgrounds")
    Comment     = require("../models/comment")

// comments new
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

// comments create
router.post("/", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // then save comment
                    campground.comments.push(comment);
                    campground.save();
                    // /campgrounds/:id
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            // connect new comment to campground
            // redirect to campground show page
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
