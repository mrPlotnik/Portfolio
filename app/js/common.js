$(document).ready(function() {

	//-----------------------------------------------------
	// Анимация 
	//-----------------------------------------------------
	$(window).load(function() {
		// Header animation
		$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");
		$(".logo-knot").addClass("flipInY animated").css("animation-delay", "1.5s")	;
		$(".logo-text").addClass("fadeIn animated").css("animation-delay", "2s");
		$(".content h1").addClass("fadeInDown animated").css("animation-delay", "0.5s");
		$(".content p").addClass("fadeInUp animated").css("animation-delay", "1s");
		$(".mw-wrap").addClass("fadeIn animated").css("animation-delay", "2.5s");
		
		//-----------------------------------------------------
		//Animate CSS + WayPoints javaScript Plugin
		//Example: $(".element").animated("zoomInUp", "zoomOutDown");
		//Author URL: http://webdesign-master.ru	
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
		
		$(".animation_1").animated("flipInY", "fadeOutDown");
		$(".animation_2").animated("fadeInLeft", "fadeOutLeft");
		$(".animation_3").animated("fadeInRight", "fadeOutRight");
		$(".animation_4").animated("fadeInUp", "fadeOutDown");		
	}); 

	//-----------------------------------------------------
	// Header. Плавный скролл по клику на иконку мыши
	//-----------------------------------------------------
	$(".mouse-icon").click(function() {
		$("html, body").animate({
			scrollTop  : $("#about").offset().top
		}, 800);
	});
	
	//-----------------------------------------------------
	// magnificPopup
	//-----------------------------------------------------
	$(".popup").magnificPopup({type:"image"});
	$(".popup_content").magnificPopup({
		type:"inline", //Можно опустить. По умолчанию всегда inline
		midClick: true //Средняя кнопка
	});
	
	//-----------------------------------------------------
	// Меню сайта
	//-----------------------------------------------------	
	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
	});

	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".sandwich").toggleClass("active");
		$(".top_text").css("opacity", "1");
	});

	$(".toggle_mnu").click(function() {
		if ($(".top_mnu").is(":visible")) {
			$(".top_text").css("opacity", "1");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").css("opacity", ".1");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu").css("display", "table");
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});	

	$(".top_mnu ul a").mPageScroll2id();
	$(".scroll2id").mPageScroll2id();

});