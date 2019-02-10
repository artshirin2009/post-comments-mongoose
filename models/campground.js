var mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
    campGroundName: String,
    campGroundImage: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ],
    addedBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);