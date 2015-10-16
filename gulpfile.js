var browserify	= require("browserify");
var babel		= require("gulp-babel");
var gulp		= require("gulp");
var source		= require("vinyl-source-stream");

gulp.task("build", function() {
	return gulp.src(["./src/js/**/*.jsx","./src/js/**/*.js"])
	.pipe(babel())
	.pipe(gulp.dest("./lib/"));
});