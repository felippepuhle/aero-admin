(function ($) {

    /* -------- *
     * DOM LOAD *
     * -------- */
	$(document).ready(function() {

		// Slider
		$('.slider').slider({full_width: true});

		// Carousel
		$('.carousel.carousel-slider').carousel({full_width: true});
		$('.carousel').carousel();

	});

}(jQuery));