$(document).ready(function() {

	//-----------------------------------------------------
	// Анимация 
	//-----------------------------------------------------
	$(window).load(function() {
		// Header
		$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");
		$(".logo_container").addClass("flipInY animated").css("animation-delay", "1.5s");
		$(".content h1").addClass("fadeInDown animated").css("animation-delay", "0.5s");
		$(".content p").addClass("fadeInUp animated").css("animation-delay", "1s");
		$(".mw-wrap").addClass("fadeIn animated").css("animation-delay", "2.5s");
			
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

	// $(".section_header").animated("fadeInUp", "fadeOutDown");
	$(".animation_1").animated("flipInY", "fadeOutDown");
	$(".animation_2").animated("fadeInLeft", "fadeOutDown");
	$(".animation_3").animated("fadeInRight", "fadeOutDown");
	// $(".animation_4").animated("fadeInUp", "fadeOutDown");
	// $(".left .resume_item").animated("fadeInLeft", "fadeOutDown");
	// $(".right .resume_item").animated("fadeInRight", "fadeOutDown");
	}); 

	//-----------------------------------------------------
	// Header. Плавный скролл по клику на иконку мыши
	//-----------------------------------------------------
	$(".mouse-icon").click(function() {
		$("html, body").animate({
			scrollTop  : $(".s_about").offset().top
		}, 800);
	});

	//------------------------------------------------------
	// Header. Высота .main_head всегда равна высоте окна
	// И пустой блок, чтобы прижать mw_wrap к низу main_head
	// При изменении размеров окна всегда идет перерасчет
	//------------------------------------------------------	
	function heightDetect() {
		var height = $(window).height();
		$(".main_head").css("height", height);		
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});
	
	
	// $(".s_portfolio li").click(function() {
	// 	$(".s_portfolio li").removeClass("active");
	// 	$(this).addClass("active");
	// });

	$(".popup").magnificPopup({type:"image"});
	$(".popup_content").magnificPopup({
		type:"inline", //Можно опустить. По умолчанию всегда inline
		midClick: true //Средняя кнопка
	});

	//Animate CSS + WayPoints javaScript Plugin
	//Example: $(".element").animated("zoomInUp", "zoomOutDown");
	//Author URL: http://webdesign-master.ru

	

	

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

	// $(".portfolio_item").each(function(i) {
	// 	$(this).find("a.seework").attr("href", "#work_" + i);
	// 	$(this).find(".podrt_descr").attr("id", "work_" + i);
	// });

	// $("input, select, textarea").jqBootstrapValidation();

	$(".top_mnu ul a").mPageScroll2id();
	$(".s_about a").mPageScroll2id();

});
