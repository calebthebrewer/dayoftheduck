var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var connect = require("gulp-connect");

var source = "source/";
var distribution = "distribution/";
var jsVendor = [
	"bower_components/angular/angular.min.js",
	"bower_components/angular-route/angular-route.min.js",
	"bower_components/marked/lib/marked.js",
	"bower_components/angular-bootstrap/ui-bootstrap.min.js",
	"bower_components/angular-bootstrap/ui-bootstrap.tpls.js"
];
var cssVendor = [
	"bower_components/bootstrap/dist/css/bootstrap.min.css"
];
var fontsVendor = [
	"bower_components/bootstrap/dist/fonts/*"
];

//default
gulp.task("build", ["styles", "js", "html", "images", "fonts"]);

//watch
gulp.task("default", ["build", "connect"], function() {
	gulp.watch(source + "**/*.scss", ["styles", "reload"]);
	gulp.watch(source + "**/*.js", ["js", "reload"]);
	gulp.watch(source + "**/*.html", ["html", "reload"]);
	gulp.watch(source + "**/*.php", ["html", "reload"]);
	gulp.watch(source + "**/*.png", ["images", "reload"]);
});

gulp.task("dev", ["default"], function() {
	gulp.src("bower_components/angular/angular.min.js.map")
		.pipe(gulp.dest(distribution + "vendor/"));
});

//compile sass to dist dir
gulp.task("styles", ["styles-vendor"], function() {
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
	return gulp.src([source + "**/*.html", source + "**/*.php"])
		.pipe(gulp.dest(distribution));
});

gulp.task("images", function() {
	return gulp.src(source + "**/*.png")
		.pipe(gulp.dest(distribution));
});

//move js vendor
gulp.task("js-vendor", function() {
	return gulp.src(jsVendor)
		.pipe(concat("vendor.js"))
		.pipe(gulp.dest(distribution + "vendor/"));
});

//move styles vendor
gulp.task("styles-vendor", function() {
	return gulp.src(cssVendor)
		.pipe(concat("vendor.css"))
		.pipe(gulp.dest(distribution + "vendor/"));
});

//move styles vendor
gulp.task("fonts", function() {
	return gulp.src(fontsVendor)
		.pipe(gulp.dest(distribution + "fonts/"));
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