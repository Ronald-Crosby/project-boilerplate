
// Requires:

const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// Styles:

const postcss_plugins = [

	require("@csstools/postcss-sass")(),
	autoprefixer({ browsers: ["last 3 versions"] }),
	cssnano(),

];

gulp.task("styles", () => (

    gulp.src(["./src/sass/**/*.scss", "./src/scss/*.scss"])
	    .pipe(sourcemaps.init())
	    .pipe(sass().on("error", sass.logError))
        .pipe(postcss(postcss_plugins))
        .pipe(sourcemaps.write())
	    .pipe(gulp.dest("./dist/css"))

));

// Scripts:

const ordered_scripts = [

	"./node_modules/babel-polyfill/dist/polyfill.js",
	"./src/js/main.js"
];

gulp.task("scripts", () => (

    gulp.src(ordered_scripts)
    	.pipe(babel({ presets: ["@babel/preset-env"] }))
	    .pipe(concat("scripts.min.js"))
	    .pipe(terser())
	    .pipe(gulp.dest("./dist/js"))

));

// Watch:

gulp.task("watch", () => {

    gulp.watch("./src/sass/*.scss", ["styles"]);
    gulp.watch("./src/sass/**/*.scss", ["styles"]);
    gulp.watch("./src/js/*.js", ["scripts"]);

});

gulp.task("default", ["styles", "scripts", "watch"]);
