var 
	// Gulp
	gulp 					= require('gulp'), // Подключаем Gulp
	// Gulp plugins		 
	pug 					= require('gulp-pug'), // Подключаем Pug
	sass 					= require('gulp-sass'), //Подключаем Sass пакет,
	cssToScss 			= require('gulp-css-scss'),
	concat 				= require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов).
	uglify 				= require('gulp-uglify'), // Минимизируем наш common.js 
	rename 				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	autoprefixer 	= require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	csso 					= require('gulp-csso'), // Подключаем отличный CSS компрессор
	imagemin 			= require('gulp-imagemin'), // Оптимизируем картинки
	filesize 			= require('gulp-size'), // Узнаем размер файла
	gutil 				= require('gulp-util'),		
	cache         = require('gulp-cache'), // Подключаем библиотеку кеширования
	// Utilities
	ftp 					= require('vinyl-ftp'),
	del           = require('del'), // Подключаем библиотеку для  удаления файлов и папок
	browserSync		= require('browser-sync'), // Подключаем Browser Sync //
	reload				= browserSync.reload; 

//-------------------------------------------	
// Скопировать шрифты в директории dist
// и преобразовать CSS в SCSS
// Достаточно запустить одинраз
//-------------------------------------------	
gulp.task('beforeTheStart', ['cssToScss', 'copyFont'], () => {
	console.log('Done! You can work. All is ready :)');
});

//-------------------------------------------
// Компилируем CSS в SCSS
//-------------------------------------------		
gulp.task('cssToScss', () => {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap-grid.min.css',
		'app/libs/magnific-popup/dist/magnific-popup.css',
		'app/libs/animate.css/animate.min.css'
		])
	.pipe(cssToScss())
	.pipe(gulp.dest('app/libs/cssToScss'));
});
//-------------------------------------------
// Копируем шрифты
//-------------------------------------------
gulp.task('copyFont', () => {
	return gulp.src('app/fonts/*')		
	.pipe(gulp.dest('dist/fonts'));
});

//-------------------------------------------
// Компилируем Pug в HTML
//-------------------------------------------
gulp.task('pug', () => {
	return gulp.src('app/pug/*.pug')
	.pipe(pug({pretty: true})) // Компилируем с индентами
	.pipe(gulp.dest('dist/'))   
	.pipe(reload({stream: true}))	// Reload
});

//------------------------------------------
// Компилируем SASS в CSS
// 1. Читаемый вариант
// 2. Переименовываем, добавляем префиксы,
// минифицируем
//------------------------------------------
gulp.task('sass', () => { 	
	return gulp.src('app/sass/**/*.sass')		
		.pipe(sass({
			outputStyle: 'expand', 
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError)) // Оповещение в случае ошибки при компиляции SASS в CSS
		.pipe(autoprefixer(['last 15 versions'])) // Добавление автопрефиксов, для одинакового отображения во всех браузерах (последнии 15 версий)
		// .pipe(gulp.dist('dist/css'))		
		.pipe(csso())	// Минимизируем	 		
		.pipe(rename({suffix: '.min', prefix : ''})) // Добавление суффикса и префикса в название CSS файла
		.pipe(gulp.dest('dist/css'))
		.pipe(filesize())			
		.pipe(browserSync.stream()); // Inject	
});

//--------------------------------------------
// Минимизируем наш common.js 
//--------------------------------------------
gulp.task('js', () => {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/parallax.js/parallax.min.js',
		'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
		'app/js/common.js'
		])		
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		// .pipe(filesize())	
		.pipe(reload({stream: true}));	// Reload
});

//---------------------------------------------
// Browser-Sync
//---------------------------------------------
gulp.task('browser-sync', () => { 
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'dist' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

//---------------------------------------------
// Vynil-FTP. Деплой на сервер
//---------------------------------------------
gulp.task( 'deploy', () => {

	var conn = ftp.create( {
		host:     '31.170.161.90',
		port:     '21',
		user:     'u517813358',
		password: 'plotnik1992',
		parallel: 10,
		log:      gutil.log
	} );

	var globs = [
	'dist/**'
	];

	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.newer( 'public_html/portfolio' ) ) // only upload newer files
		.pipe( conn.dest( 'public_html/portfolio' ) );
} );       

//----------------------------------------------
// Наблюдаем за изменениями, компилируем, перезагружаем
//----------------------------------------------
gulp.task('watch', ['pug', 'sass', 'js', 'browser-sync'], () => {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/js/**/*.js', ['js']);
});

//----------------------------------------------
// Оптимизация, минификация изображений
//----------------------------------------------
gulp.task('imagemin', () =>
	gulp.src('app/img/**/*')	
		.pipe(cache(imagemin()) // Cache Images
		.pipe(gulp.dest('dist/img/'))
));

//----------------------------------------------
// Очистка директории
//----------------------------------------------
gulp.task('removedist', () => {
	return del.sync([
		'dist/*',
		'!dist/fonts'
	]); 
});

//----------------------------------------------
// По умолчанию (при запуске)
//----------------------------------------------
gulp.task('default', ['removedist', 'imagemin', 'watch']);