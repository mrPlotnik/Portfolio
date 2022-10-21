const {
	watch,
	parallel,
	series
} = require('gulp');

module.exports = function watching() {
	watch('src/pug/**/*.pug', parallel('pug'));
	watch('src/sass/**/*.sass', parallel('style'));
	watch('src/**/*.js', parallel('js_dev'));
	watch('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)', parallel('img_rastr'));
	// watch('build/img/**/*.+(png|jpg|jpeg)', parallel('webp'));
	// watch('src/svg/css/**/*.svg', series('svg_css', 'style'));
	// watch('src/svg/sprite/**/*.svg', series('svg_sprite', 'rastr'));
	watch('src/fonts/**/*.ttf', series('ttf'));
}
