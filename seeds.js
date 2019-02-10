var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
        {
            campGroundName: "Vermont campgrounds",
            campGroundImage: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate efficitur ante. Suspendisse dignissim hendrerit tempus. Maecenas eget libero et nulla ornare interdum quis sit amet ipsum. Sed pellentesque sapien vel faucibus sollicitudin. Vivamus dolor eros, varius accumsan varius ac, porta ut risus. Proin mattis nunc velit, eu convallis odio sodales auctor. Curabitur accumsan volutpat quam. In tristique egestas lacus, in imperdiet erat imperdiet a. Donec venenatis lectus elit, quis pulvinar lectus vestibulum eget. Integer nisl ante, luctus ac facilisis pellentesque, consequat id arcu. Praesent eu felis malesuada, dignissim enim a, auctor nibh. Morbi ut odio a nisi gravida sollicitudin ut a turpis. Phasellus vitae sapien mi. Quisque tortor nisi, porttitor eu dui non, convallis lacinia mi. Nam a consequat justo. Sed rutrum nisi sed dictum suscipit.Quisque condimentum aliquet sem. Fusce vitae eros a nibh egestas ornare. Sed tellus odio, finibus a turpis vel, consequat pellentesque justo. Quisque volutpat risus eu turpis hendrerit, non sagittis lacus dapibus. Praesent convallis est et eros iaculis pulvinar. Cras in tincidunt diam. Duis vel tempus dui. Maecenas finibus finibus ligula, ut rhoncus quam posuere vitae. Maecenas accumsan gravida libero. Proin aliquam mollis justo, et lacinia erat. Etiam id convallis ex."
        },
        {
            campGroundName: "Bittangabee campground",
            campGroundImage: "https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
            description: "Aenean urna libero, imperdiet quis tellus id, consectetur auctor elit. Nunc nec urna fringilla, consequat nulla vitae, ultricies tellus. Nunc vel ultricies tortor, eget fringilla erat. Etiam ultrices, metus ac molestie mollis, purus elit fermentum massa, vel bibendum elit tortor non lorem. Aliquam vel lectus lacus. Nunc id nisl accumsan, finibus elit consectetur, tempor ipsum. Vestibulum nec sapien lacinia, viverra nibh quis, tristique ante. Nam tincidunt ipsum quis libero gravida vestibulum. Nunc quis tempus tellus. Etiam in justo neque. Quisque non faucibus nisl. Curabitur pulvinar sodales diam ac molestie.Vestibulum sodales dapibus nisl id laoreet. Pellentesque ullamcorper lobortis nulla, sit amet cursus odio ultrices vitae. Praesent vitae purus malesuada lectus dignissim dapibus et vitae purus. Nullam feugiat cursus ipsum, eget maximus purus. Donec porta turpis ut dapibus suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc orci ante, molestie ut nunc ac, finibus congue sapien. Sed turpis ligula, mattis ac elit vitae, sollicitudin bibendum diam. Duis at turpis magna. Phasellus pellentesque tortor at ligula ultrices, nec porttitor sem bibendum. Aliquam dolor orci, feugiat ut feugiat nec, tempus pellentesque metus."
        },
        {
            campGroundName: "Lake Glory Campground",
            campGroundImage: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
            description: "Suspendisse luctus vestibulum laoreet. Morbi scelerisque eros ac nibh scelerisque posuere. Pellentesque vitae luctus eros. Nulla vehicula ullamcorper nisl, at bibendum enim lobortis et. Integer rhoncus ante sit amet nibh vehicula ornare. Proin sodales elit in bibendum tincidunt. Sed congue purus quis cursus mollis. Etiam bibendum convallis elit vulputate sodales. Praesent neque diam, semper non felis quis, aliquam dignissim quam. Praesent dapibus gravida dolor eu pharetra. Nunc sit amet tempus orci. Nulla pellentesque mauris id massa vehicula, non pellentesque lacus tincidunt. Pellentesque ultricies iaculis ipsum vel tincidunt. Quisque gravida, nisi ut varius suscipit, ex ipsum gravida ipsum, eget rutrum risus orci eu sem.Maecenas dictum condimentum leo, id scelerisque ante posuere sed. Fusce bibendum magna purus, nec vulputate diam commodo a. Sed tristique luctus ipsum at suscipit. Sed ultricies bibendum purus, id tempor magna luctus sit amet. Vestibulum vitae massa id urna facilisis dignissim. Nullam nec enim ex. Aliquam vulputate dui vel dui aliquam gravida. Donec eu nisl nisi. Vivamus condimentum tortor at ullamcorper dignissim. Morbi nec nunc ac enim dictum lobortis vitae non arcu. Quisque consectetur lorem et sodales maximus. Suspendisse nec pellentesque nunc, non consectetur leo. Phasellus malesuada metus magna, in tincidunt ipsum fringilla a. Nulla posuere viverra tristique."
        }
    ];

function seedDB() {
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("DATABASE CLEARED SUCCESSFULLY..");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("DATABASE ADDED..");
                        // Comment.create({
                        //     text: "I love this place and it would've been better if there was Internet!",
                        //     author: "Homer"
                        // }, function(err, comment) {
                        //         if(err) {
                        //             console.log(err);
                        //         } else {
                        //             campground.comments.push(comment);
                        //             campground.save();
                        //             console.log("CREATED A COMMENT!");
                        //         }
                        // });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;