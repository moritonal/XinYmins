var gulp = require("gulp");

gulp.task("noJekyll",  () => {
    const path = require("path");
    const fs = require("fs");

    return new Promise((res, rej) => {

        fs.writeFile(path.join("./dist", ".nojekyll"), "", () => {
            res();
        });
    })
})

gulp.task("default", gulp.parallel("noJekyll"));