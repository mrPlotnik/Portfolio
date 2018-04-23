var 
		// Gulp
		gulp 					= require('gulp'), // Подключаем Gulp
		// Gulp plugins		 
		pug 					= require('gulp-pug'), // Подключаем Pug
		sass 					= require('gulp-sass'), //Подключаем Sass пакет,
		concat 				= require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов).
		uglify 				= require('gulp-uglify'), // Минимизируем наш common.js 
		rename 				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		autoprefixer 	= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
		csso 					= require('gulp-csso'), // Подключаем отличный CSS компрессор
		imagemin 			= require('gulp-imagemin'), // Оптимизируем картинки
		filesize 			= require('gulp-size'), // Узнаем размер файла
		// Utilities
		browserSync		= require('browser-sync'), // Подключаем Browser Sync //
		reload				= browserSync.reload; 


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
// Компилируем SASS в CSS
// 1. Читаемый вариант
// 2. Переименовываем, добавляем префиксы,
// минифицируем
//------------------------------------------
gulp.task('sass', function(){ 	
	return gulp.src('app/sass/**/*.sass')		
		.pipe(sass({
			outputStyle: 'expand', 
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		.pipe(autoprefixer(['last 15 versions'])) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		.pipe(filesize())		
		.pipe(gulp.dest('app/css'))		
		.pipe(csso())	// Минимизируем	 		
		.pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(gulp.dest('app/css/min'))
		.pipe(filesize())			
		.pipe(browserSync.stream()); // Inject	
});

//--------------------------------------------
// Минимизируем наш common.js 
//--------------------------------------------
gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/jquery-2.1.3.min.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/magnific-popup/js/jquery.magnific-popup.min.js',
		'app/libs/parallax/parallax.min.js',
		'app/libs/pagescroll2id/PageScroll2id.min.js',
		'app/js/common.js',
		])		
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(filesize())	
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
gulp.task('watch', ['pug', 'sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/views/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', ['js']);
});

//----------------------------------------------
// Оптимизация, минификация изображений
//----------------------------------------------
gulp.task('imagemin', () =>
	gulp.src('app/img/stock/**/*')	
		.pipe(imagemin())
		.pipe(gulp.dest('app/img/'))
);

//----------------------------------------------
// По умолчанию (при запуске)
//----------------------------------------------
gulp.task('default', ['imagemin', 'watch', ]
);