var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var packageFile = require('./package.json');

gulp.task('deploy', function() {
    return gulp.src(['build/**/*', '.user.passwd'])
        .pipe(ghPages({
            remoteUrl: packageFile.repository.url,
            branch: 'gl-pages'
        }));
});