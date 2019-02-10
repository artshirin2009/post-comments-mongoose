var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var mongoose = require("mongoose");
var middleware = require("../middleware");
//CREATE A NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res) {
    var campID = req.params.id;
    Campground.findById(campID, function(err, foundCampground) {
      if(err) {
          console.log(err);
      } else {
            res.render("comment/newComment", {campground: foundCampground});  
      }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    
            Comment.create(req.body.comment, function(err, createdComment) {
                if(err) {
                    console.log(err);
                } else {
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
                        foundCampground.comments.push(createdComment);
                        foundCampground.save();
                        req.flash("success" , "Comment created successfully");
                        res.redirect("/index/" + req.params.id); 
                    });
                }        
            });
});


router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.render("back");
        } else {
            res.render("comment/editcomment", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
                req.flash("success", "Comment edited successfully");
                res.redirect("/index/" + req.params.id);
        });
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       req.flash("success", "Comment deleted successfully");
        res.redirect("back");  
   });
});



module.exports = router;
