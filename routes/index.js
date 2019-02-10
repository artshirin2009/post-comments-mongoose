var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var passport = require("passport");
// REQUESTS
// LANDING PAGE
router.get("/", function(req, res) {
   res.render("landing"); 
});

//AUTH ROUTES

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err);
            return res.render("/register");
        }
        else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to YelpCamp, "+ req.user.username);
                res.redirect("/index");
            });
        }
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
}), function(req, res){
    
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You're successfully logged out.");
    res.redirect("/index"); 
});

module.exports = router;