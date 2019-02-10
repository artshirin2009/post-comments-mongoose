var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = {};

middleware.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
               res.redirect("back");
           } else {
               if(foundCampground.addedBy.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
           }
        });
    }
}

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
};

middleware.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err) {
               res.redirect("");
           } else {
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = middleware;