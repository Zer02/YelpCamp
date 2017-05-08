var mongoose 		= require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
// DO THIS
module.exports = mongoose.model("Campground", campgroundSchema);

// Alternative: (this is too long)
// var Campground = mongoose.model("Campground", campgroundSchema);
// module.exports = Campground
