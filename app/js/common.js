document.addEventListener('DOMContentLoaded', function() {
	const body = document.querySelector('body');
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.menu');
	const links = document.querySelectorAll('.menu a');
	let pro = burger.getAttribute('aria-expanded');

	burger.addEventListener('click', function() {
		body.classList.toggle('stop-scroll');

		if (pro == 'false') {
			burger.setAttribute('aria-expanded', 'true');
			pro = 'true';
		} else {
			burger.setAttribute('aria-expanded', 'false');
			pro = 'false';
		}

		burger.classList.toggle('burger--active');
		menu.classList.toggle('menu--active');
		links.forEach(function(el,) {
			el.classList.add('fadeInUp', 'animated');
		})
	})
});




$(document).ready(function() {

	$(window).stellar();

	//-----------------------------------------------------
	// Анимация
	//-----------------------------------------------------
	$(window).load(function() {
		// Header animation
		$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");
		// $(".logo-container").addClass("flipInY animated").css("animation-delay", "1.5s")	;
		// $(".logo-text").addClass("fadeIn animated").css("animation-delay", "2s");
		// $(".content h1").addClass("fadeInDown animated").css("animation-delay", "0.5s");
		// $(".content p").addClass("fadeInUp animated").css("animation-delay", "1s");
		// $(".mw-wrap").addClass("fadeIn animated").css("animation-delay", "2.5s");

		//-----------------------------------------------------
		//Animate CSS + WayPoints javaScript Plugin
		//Example: $(".element").animated("zoomInUp", "zoomOutDown");
		//-----------------------------------------------------
		(function($) {
			$.fn.animated = function(inEffect, outEffect) {
				$(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
					if (dir === "down") {
						$(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
					} else {
						$(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
					};
				}, {
					offset: "80%"
				}).waypoint(function(dir) {
					if (dir === "down") {
						$(this).removeClass(inEffect).addClass(outEffect).css("opacity", "1");
					} else {
						$(this).removeClass(outEffect).addClass(inEffect).css("opacity", "1");
					};
				}, {
					offset: -$(window).height()
				});
			};
		})(jQuery);

		$(".animation_1").animated("flipInY", "fadeOut");
		$(".animation_2").animated("fadeInLeft", "fadeOutLeft");
		$(".animation_3").animated("fadeInRight", "fadeOutRight");
		$(".animation_4").animated("fadeIn", "fadeOut");

		//-----------------------------------------------------
		// Header. Плавный скролл по клику на иконку мыши
		//-----------------------------------------------------
		// $(".mouse-icon").click(function() {
		// 	$("html, body").animate({
		// 		scrollTop  : $("#about").offset().top
		// 	}, 800);
		// });

		//-----------------------------------------------------
		// magnificPopup
		//-----------------------------------------------------
		// $(".popup").magnificPopup({type:"image"});
		// $(".popup").magnificPopup({
		// 	type:"image", //Можно опустить. По умолчанию всегда inline
		// 	// mainClass: 'mfp-with-zoom',
		// 	zoom: {
		// 		enabled: true, // По умолчанию false, не забудь включить
		// 		duration: 300, // Продолжительность эффекта в миллисекундах
		// 		easing: 'ease-in-out', // CSS transition easing function
		// 		// TФункция «opener» должна возвращать элемент, из которого будет увеличено всплывающее окно
		// 		// и до которого всплывающее окно будет уменьшено
		// 		// По умолчанию он ищет тег изображения:
		// 	},
		// });

		//-----------------------------------------------------
		// Меню сайта
		//-----------------------------------------------------



		// $(".top_mnu ul a").click(function() {
		// 	$(".top_mnu").fadeOut(600);
		// 	$(".sandwich").toggleClass("active");
		// 	$(".top_text").css("opacity", "1");
		// });

		// $(".toggle_mnu").click(function() {
		// 	if ($(".top_mnu").is(":visible")) {
		// 		$(".top_text").css("opacity", "1");
		// 		$(".top_mnu").fadeOut(600);
		// 		$(".top_mnu li a").removeClass("fadeInUp animated");
		// 	} else {
		// 		$(".top_text").css("opacity", ".1");
		// 		$(".top_mnu").fadeIn(600);
		// 		$(".top_mnu").css("display", "table");
		// 		$(".top_mnu li a").addClass("fadeInUp animated");
		// 	};
		// });

		// $(".top_mnu ul a").mPageScroll2id();
		// $(".scroll2id").mPageScroll2id();

		//-----------------------------------------------------
		//Все element одинаковой высоты
		//-----------------------------------------------------
		// function equalHeight(element){
		// 	var maxHeight = 0;  // максимальная высота, первоначально 0
		// 	element.each(function() { // цикл "для каждого из элементов"
		// 		if($(this).height() > maxHeight) { // если высота колонки больше значения максимальной высоты,
		// 			maxHeight = $(this).height();	// то она сама становится новой максимальной высотой
		// 		}
		// 	});
		// 	$(element).height(maxHeight); // устанавливаем высоту каждой колонки равной значению максимальной высоты
		// };

		// var element = $(".card-body"); // Высоту чего будем выравнивать?
		// equalHeight(element);	// Передаем функции нужные элементы

		// $(window).resize(function	() { // пересчитываем значения при изменении размераокна браузера
		// 	element.css("height", "100%"); // Не забываем сбрасывать
		// 	equalHeight(element);
		// });

	});

});
