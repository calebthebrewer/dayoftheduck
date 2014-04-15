var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");

var source = "source/";
var distribution = "distribution/";
var jsVendor = [
	"bower_components/d3/d3.min.js"
];

//default
gulp.task("default", ["sass", "js", "html", "images"]);

//watch
gulp.task("watch", ["default", "connect"], function() {
	gulp.watch(source + "**/*.scss", ["sass", "reload"]);
	gulp.watch(source + "**/*.js", ["js", "reload"]);
	gulp.watch(source + "**/*.html", ["html", "reload"]);
});

//compile sass to dist dir
gulp.task("sass", function() {
	return gulp.src(source + "dayoftheduck.scss")
		.pipe(sass())
		.pipe(gulp.dest(distribution));
});

//move js to dist dir
gulp.task("js", ["js-vendor"], function() {
	return gulp.src(source + "dayoftheduck.js")
		.pipe(gulp.dest(distribution));
});

//move html to dist dir
gulp.task("html", function() {
	return gulp.src(source + "index.html")
		.pipe(gulp.dest(distribution));
});

gulp.task("images", function() {
	return gulp.src(source + "**/*.png")
		.pipe(gulp.dest(distribution));
});

//move js vendor
gulp.task("js-vendor", function() {
	return gulp.src(jsVendor)
		.pipe(gulp.dest(distribution + "vendor/"));
});

//connect
gulp.task("connect", function() {
	connect.server({
		root: 'distribution',
		livereload: true
	});
});

gulp.task("reload", function() {
	connect.reload();
});