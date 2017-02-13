(function ($) {

	/* ----------------- *
     * Table of Contents *
     * ----------------- */
    $.TableOfContents = function () {

	    /* ---- *
	     * Init *
	     * ---- */
    	var init = function() {
    		// Apply Pushpin
			$('.pushpin-wrapper').pushpin({
				top: calcTopPosition(),
				bottom: calcBottomPosition(),
				offset: calcOffset()
			});

			// Apply Scrollspy
			$('.scrollspy').scrollSpy();
    	};

		var calcTopPosition = function() {
			// Nav height
			var navHeight = $('#nav-content nav').height();

			// Header height and margin
			var headerHeight = $('.page-header') ? $('.page-header').parents('.row').height() : 0;
			var headerMargin = $('.page-header') ? parseInt($('.page-header').parents('.row').css('margin-bottom')) : 0;

			// Content padding
			var contentPadding = parseInt($('.main-content').css('padding-top'));

			return navHeight + headerHeight + headerMargin + contentPadding;
		};

		var calcBottomPosition = function() {
			// Footer offset
			var footerOffset = $('footer') ? $('footer').first().offset().top : 0;

			// Content padding
			var contentPadding = parseInt($('.main-content').css('padding-bottom'));

			// Pushpin content height
			var pushpinContentHeight = $('.pushpin-wrapper .table-of-contents').height();

			// Security gutter (avoid layout break)
			var securityGutter = 50;

			return footerOffset - contentPadding - pushpinContentHeight - securityGutter;
		};

		var calcOffset = function() {
			if($('#nav-content').hasClass('navbar-fixed')) {
				return 100;
			}

			return 0;
		}


	    /* ------ *
	     * Reload *
	     * ------ */
    	var reload = function() {
    		// Removes pushpin and pushpin classes
    		$('.tabs-wrapper .row').pushpin('remove');

    		// Initialize again
    		init();
    	};


        /* --- *
         * API *
         * --- */
        return {
        	init: init,
            reload: reload
        }
    };


    /* --------- *
     * Listeners *
     * --------- */
	$(document).ready(function() {

		setTimeout(function() {
			$.TableOfContents().init();
		}, 100);

	});

}(jQuery));