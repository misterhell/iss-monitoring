const { src, task } = require('gulp');
const deploy = require('gulp-gh-pages');


/**
 * Push build to gh-pages
 */
task('deploy', () => src('./build/**/*').pipe(deploy({ force: true })));