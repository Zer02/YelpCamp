var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
		description: "blah blah blah"
	},
	{
		name: "Desert Mesa",
		image: "https://farm1.staticflickr.com/110/316612922_38fb0698f5.jpg",
		description: "blah blah blah"
	},
	{
		name: "Canyon Floor",
		image: "https://farm1.staticflickr.com/106/316612923_1fc06a0cdf.jpg",
		description: "blah blah blah"
	}
]

// Delete everything in DB (all campgrounds)
function seedDB(){
	Campground.remove({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("removed camppgrounds!");
	});
	// add in a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if (err) {
				console.log(err);
			} else {
					console.log("Added a campground");
					// create a comment
					Comment.create(
						{
							text: "This place is great, but I wish there was internet.",
							author: "Homer"
						}, function(err, comment) {
								if (err) {
									console.log(err);
								} else {
										campground.comments.push(comment);
										campground.save();
										console.log("Created new comment");
								}
						});
			}
		});
	})
	// add a few comments
}

module.exports = seedDB;
