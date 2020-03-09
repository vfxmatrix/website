(function (window) {

	'use strict';

	$.exists = function (selector) {
		return ($(selector).length > 0);
	}

	window.onpageshow = function (event) {
		if (event.persisted) {
			PageTransition();
		}
	};

	// All Funtions
	PageTransition();
	Menu();
	ms_home_slider();
	Sort();
	UniteGallery();
	ValidForm();

})(window);

/*--------------------
Page Transition
---------------------*/
function PageTransition() {
	var preload = anime({
			targets: '.ms-preloader',
			opacity: [1, 0],
			duration: 1000,
			easing: 'easeInOutCubic',
			complete: function (preload) {
				$('.ms-preloader').css('visibility', 'hidden');
			}
		});
	$('.ms-main-container').addClass('loaded');
	var cont = anime({
			targets: '.loaded',
			opacity: [0, 1],
			easing: 'easeInOutCubic',
			duration: 1000,
			delay: 300,
			complete: function (preload) {
				$('.ug-thumb-image').css({
					'opacity': '1'
				});
				$('.ms-section__block img').css({
					'opacity': '1'
				});
				$('.ug-thumb-wrapper, .post-item').css({
					'pointer-events': 'auto'
				});
			}
		});
	$(document).on('click', '[data-type="page-transition"]', function (e) {
		var url = $(this).attr('href');
		if (url != '#' && url != '') {
			e.preventDefault();
			$('.ms-preloader').css('visibility', 'visible');
			var url = $(this).attr('href');
			var preload = anime({
					targets: '.ms-preloader',
					opacity: [0, 1],
					duration: 300,
					easing: 'easeInOutQuad',
					complete: function (preload) {
						window.location.href = url;
					}
				});
		}
	});
}

/*------------------
Menu
-------------------*/
function Menu() {
	if ($.exists('.hamburger')) {
		$('.hamburger').on('click', function (e) {
			var burger = $(this);
			$(burger).toggleClass('is-active');
			$('.ms-nav').toggleClass('is-visible');
			$('.ms-header').not('.navbar-white').each(function () {
				$('.logo-light').toggleClass('active');
			});
		});
		$('.height-full-viewport').on({
			'mousewheel': function (e) {
				if (e.target.id === 'el')
					return;
				e.preventDefault();
				e.stopPropagation();
			}
		})
	}
}

/*------------------
Home Slider
-------------------*/
function ms_home_slider() {
	if ($.exists('.swiper-container')) {
		var swiper = new Swiper('.swiper-container', {
				loop: false,
				speed: 1000,
				grabCursor: false,
				mousewheel: true,
				keyboard: true,
				simulateTouch: false,
				parallax: true,
				effect: 'slide',
				pagination: {
					el: '.swiper-pagination',
					type: 'progressbar',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
			});
		$('.expanded-timeline__counter span:first-child').text('1');
		$('.expanded-timeline__counter span:last-child').text(swiper.slides.length);
		swiper.on('slideChange', function () {
			$('.expanded-timeline__counter span:first-child').text(swiper.activeIndex + 1);
		});

	}
}

/*------------------
Sort
-------------------*/
function Sort() {
	if ($.exists('.filtr-container')) {
		$('.filtr-container').filterizr();
		$('.filtr-btn li').on('click', function () {
			$('.filtr-btn li').removeClass('active');
			$(this).addClass('active');
		});
	}
}
/*------------------
Unite-Gallery
-------------------*/
function UniteGallery() {
	if ($.exists('#gallery')) {
		$('#gallery').unitegallery({
			gallery_theme: 'tiles',
			tile_enable_image_effect: true,
			tile_enable_overlay: false,
			tile_enable_icons: false,
			tiles_type: "nested",
		});
	}
}
/*------------------
Form Validation
-------------------*/
function ValidForm() {
	if ($.exists('#validForm')) {
		$('.form-control').focus(function () {
			$(this).prev('.control-label').addClass('active');
		});
		$('.form-control').focusout(function () {
			$(this).prev('.control-label').removeClass('active');
		});
		$("#validForm").validate({
			ignore: ":hidden",
			rules: {
				name: {
					required: true,
					minlength: 2,
					maxlength: 16,
				},
				email: {
					required: true,
					email: true,
				},
				subject: {
					required: true,
					minlength: 4,
					maxlength: 32,
				},
				message: {
					required: true,
					minlength: 16,
				},
			},
			messages: {
				name: {
					required: "<span>Моля, въведете Вашето име!</span>",
					minlength: "<span>Вашето име трябва да съдържа повече от 2 символа!</span>",
					maxlength: "<span>Максималният брой символи е 16</span>",
				},
				email: {
					required: "<span>Моля, въведете Вашия имейл!</span>",
					email: "<span>Моля, въведете валиден имейл адрес!</span>",
				},
				subject: {
					required: "<span>Моля, въведете тема на съобщението си!</span>",
					minlength: "<span>Вашата тема трябва да съдържа повече от 2 символа!</span>",
					maxlength: "<span>Максималният брой символи е 32!</span>",
				},
				message: {
					required: "<span>Моля, въведете ми съобщение!</span>",
					minlength: "<span>Вашето съобщение трябва да съдържа повече от 16 символа!</span>",
					maxlength: "<span>Максималният брой символи е 200!</span>",
				},
			},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "contact.php",
					data: $(form).serialize(),
					beforeSend: function () {
						// do something
					},
					success: function (data) {
						if (data == "Благодаря Ви за съобщението!");
						$('input, textarea').val('');
						$('.form-group').blur();
						// do something
					}
				});
				return false;
			}
		});
	}
}