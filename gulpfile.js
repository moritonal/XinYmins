const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const svg2png = require('gulp-svg2png');
const rename = require("gulp-rename");
const responsive = require('gulp-responsive');
const logger = require("gulp-logger");
const workbox = require("workbox-build");

gulp.task("favicon-512",  () => {

    return gulp.src('./src/assets/**/*.svg')
        .pipe(svg2png({
            width: 512, 
            height: 512
        }))
        .pipe(rename({
            suffix: "-512"
        }))
        .pipe(gulp.dest('./src/assets/generated'));
});

gulp.task("favicon", gulp.series("favicon-512", () => {

    return gulp.src("./src/assets/generated/icon-512.png")
        .pipe(responsive({
            "icon-512.png": [
                {
                    height: 64,
                    width: 64,
                    rename: "icon-64.png"
                },
                {
                    height: 32,
                    width: 32,
                    rename: "icon-32.png"
                }
            ]
        }))
        .pipe(gulp.dest("./src/assets/generated"))
}));

gulp.task("noJekyll",  () => {

    return new Promise((res) => {
        fs.writeFile(path.join("./dist", ".nojekyll"), "", () => {
            res();
        });
    });
});

var stagingDirectory = "./dist"

gulp.task('generate-service-worker', () => {
    return workbox.generateSW({
        globDirectory: stagingDirectory,
        globPatterns: ["**\/*.{html,js,css,jpg,webmanifest,png}"],
        swDest: `${stagingDirectory}/sw.js`,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
            {
                urlPattern: new RegExp('https://fonts.googleapis.com'),
                handler: 'staleWhileRevalidate'
            }, {
                urlPattern: new RegExp("https://fonts.gstatic.com"),
                handler: 'staleWhileRevalidate'
            },
            {
                urlPattern: new RegExp("\/"),
                handler: 'staleWhileRevalidate'
            }
        ]
    }).then(() => {
        console.info('Service worker generation completed.');
    }).catch((error) => {
        console.warn('Service worker generation failed: ' + error);
    });
});

gulp.task("default", gulp.series(gulp.parallel("favicon", "noJekyll"), "generate-service-worker"));