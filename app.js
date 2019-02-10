var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    passport         = require("passport"),
    localStrategy    = require("passport-local");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

seedDB();
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/yelpcamp_1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I'm a Web Developer",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
app.use(function(req, res, next) {
   res.locals.loggedUser = req.user;
   res.locals.errorMessage    = req.flash("error");
   res.locals.successMessage  = req.flash("success");
   next();
});





app.use("/index", campgroundRoutes);
app.use("/index/:id/comments", commentRoutes);
app.use(indexRoutes);


app.listen(4000, process.env.IP, function() {
    console.log('YELP CAMP SERVER HAS STARTED');
    console.log(process.env.PORT
        )
});