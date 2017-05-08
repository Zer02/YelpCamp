var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// create yelpcamp database inside of MongoDB
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// creates model that uses campgroundSchema - has a bunch of methods like .find(), .create(), etc
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
// 		description: "This is a huge granite hill, no bathrooms. No water, beautiful granite."
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res) {
	res.render("landing");
})

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else {
				res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
				// redirect back to campgrounds page
				res.redirect("/campgrounds");
		}
	});
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new");
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find the campground with the provided ID
	// .findById(id, callback)
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
				//render show template with that campground
				res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function() {
	console.log("YelpCamp Server has started!!");
})
