var gulp = require('gulp'),//Данной строчкой мы подключаем Gulp к нашему проекту, посредством функции require. Данная функция подключает пакеты из папки node_modules в наш проект, присваивая их переменной. В данном случае, мы создаем переменную gulp.

sass = require('gulp-sass'); //Подключаем Sass пакет

gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass') // Берем все sass файлы из папки sass и дочерних, если таковые будут
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
});


gulp.task('mytask', function() {
	console.log('Привет, я таск!');
});