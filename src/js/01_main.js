document.addEventListener('DOMContentLoaded', function() {

	function burger() {
		const body = document.querySelector('body');
		const burger = document.querySelector('.burger');
		const menu = document.querySelector('.menu');
		const links = document.querySelectorAll('.menu a');
		let pro = burger.getAttribute('aria-expanded');

		function isActive() {
			if (pro == 'false') {
				burger.setAttribute('aria-expanded', 'true');
				pro = 'true';
				links.forEach((el) => {
					el.classList.add('fadeInUp', 'animated');
				})
			} else {
				burger.setAttribute('aria-expanded', 'false');
				pro = 'false';
				links.forEach((el) => {
					el.classList.remove('fadeInUp', 'animated');
				})
			}
		}

		burger.addEventListener('click', function() {
			body.classList.toggle('stop-scroll');
			burger.classList.toggle('burger--active');
			menu.classList.toggle('menu--active');
			isActive();
		})

		links.forEach((el, index) => {
			el.addEventListener('click', function(e) {
				body.classList.remove('stop-scroll');
				burger.classList.remove('burger--active');
				menu.classList.remove('menu--active');
				isActive();
			})
		})

	}

	burger();

	$(window).stellar();

	// Анимация
	$(".header__logo").addClass("flipInY animated").css("animation-delay", "0.5s")	;
	$(".burger").addClass("fadeIn animated").css("animation-delay", "1.5s");

	$(".hero__link").addClass("fadeIn animated").css("animation-delay", "0.5s");
	$(".hero__descr--first").addClass("fadeInDown animated").css("animation-delay", "1s");
	$(".hero__descr--last").addClass("fadeInUp animated").css("animation-delay", "1s");
	$(".hero__mouse-icon").addClass("fadeInUp animated").css("animation-delay", "1.5s");

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

	// Плавный скролл
	$('.smooth-scroll').on( 'click', function() {
		var el = $(this);
		var dest = el.attr('href'); // получаем направление
		if(dest !== undefined && dest !== '') { // проверяем существование
				$('html').animate({
					scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
				}, 500 // скорость прокрутки
				)
		}
		return false
	});

		// magnificPopup
		$(".popup").magnificPopup({
			type:"image",
			zoom: {
				enabled: true,
				duration: 300, // Продолжительность эффекта в миллисекундах
				easing: 'ease-in-out'
			}
		});

});
