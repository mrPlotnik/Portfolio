var gulp 					= require('gulp'), // Подключаем Gulp
		pug 					= require('gulp-pug'), // Подключаем Pug
		sass 					= require('gulp-sass'), //Подключаем Sass пакет,		
		browserSync		= require('browser-sync'), // Подключаем Browser Sync
		reload				= browserSync.reload,
		concat 				= require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов). 
		uglify 				= require('gulp-uglify'), // Минимизируем наш common.js 
		rename 				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		autoprefixer 	= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
		cleanCSS 			= require('gulp-clean-css'); //

//-------------------------------------------
// Компилируем Pug в HTML
//-------------------------------------------
gulp.task('pug', function () {
	return gulp.src('app/views/*.pug')
	.pipe(pug({
			pretty: true // Компилируем с индентами
		}))
	.pipe(gulp.dest('app'))   
	.pipe(reload({stream: true}))	// Reload
});

//------------------------------------------
// Компиируем SASS в CSS
// 1. Переименовываем, добавляем префиксы,
// минифицируем
// 2. Читаемый вариант
//------------------------------------------
gulp.task('sass', function(){ 
	// 1.
	return gulp.src('app/sass/**/*.sass') 
		.pipe(sass().on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		.pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(autoprefixer(['last 15 versions'])) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		.pipe(cleanCSS()) // Очистить и минифицировать
		.pipe(gulp.dest('app/css/min')) 
	// 2.	
		return gulp.src('app/sass/**/*.sass') 
		.pipe(sass().on('error', sass.logError)) 	
		.pipe(autoprefixer(['last 15 versions'])) 
	// Inject	
		.pipe(browserSync.stream()) 
});

//--------------------------------------------
// Минимизируем наш common.js 
//--------------------------------------------
gulp.task('common-js', function() {
	return gulp.src('app/js/common.js')	
	.pipe(rename({suffix: '.min', prefix : ''})) // Добавляем суффикс и префикс в название CSS файла
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream: true}));	// Reload
});

//---------------------------------------------
// Browser-Sync
//---------------------------------------------
gulp.task('browser-sync', function() { 
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

//----------------------------------------------
// Наблюдаем за изменениями, компилируем, перезагружаем
//----------------------------------------------
gulp.task('watch', ['pug', 'sass', 'common-js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/views/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', ['common-js']);
});

gulp.task('default', ['watch']);