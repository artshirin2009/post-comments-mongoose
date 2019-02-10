var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.use(function(req, res, next) {
   res.locals.loggedUser = req.user;
   next();
});


//CAMPGROUNDS PAGE
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log("An error has occured");
        } else {
        res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user}); 
        }
    });
});

//POST A NEW CAMPGROUND

router.post("/", middleware.isLoggedIn, function(req, res){
  var campGroundName = req.body.name;
  var campGroundImage = req.body.image;
  var description = req.body.description;
  var newCamp = {campGroundName:campGroundName, campGroundImage:campGroundImage, description:description};
  Campground.create(newCamp, function(err, newlyCreated) {
      if(err) {
          console.log(err);
      }
      else {
          newlyCreated.addedBy.id = req.user._id;
          newlyCreated.addedBy.username = req.user.username;
          newlyCreated.save();
          res.redirect("/index");
      }
  });
});

//ADD A NEW CAMP PAGE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/newcamp");
});

//SHOW A CAMP
router.get("/:id", function(req, res) {
   var campID = req.params.id;
   Campground.findById(campID).populate("comments").exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/showCamp", {campground: foundCampground});
       }
   });
});

//EDIT A CAMPGROUND
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err , foundCampground) {
        if(err) {
            res.redirect("/index/login");
        } else {
            res.render("campgrounds/editcamp", {campground: foundCampground});           
        }
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,{new : true}, function(err, updatedCampground) {
       if(err) {
           res.redirect("/index");
       } else {
            req.flash("success", "Campground edited successfully");
            res.redirect("/index/" + req.params.id);    
       }
   }); 
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/index");
        } else {
            req.flash("success", "Campground deleted successfully");
            res.redirect("/index");
        }
    });
});


module.exports = router;