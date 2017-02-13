(function ($) {

    /* ---------------------------- *
     * Generate a random identifier *
     * ---------------------------- */
	$.randomID = function(len, charSet) {
        len = len || 10;
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }

        return randomString;
	};


    /* ----------------------------- *
     * Verify if is a valid selector *
     * ----------------------------- */
	$.isValidSelector = function(selector) {
	    try {
	        var $element = $(selector);
	    } catch(error) {
	        return false;
	    }
	    
	    return true;
	};


    /* -------- *
     * DOM LOAD *
     * -------- */
	$(document).ready(function() {

	    /* -------------------- *
	     * Scroll to top button *
	     * -------------------- */
        $('.scrollToTop').click(function () {
            $('html, body').animate({scrollTop: 0}, 300);

            return false;
        });


	    /* ------------ *
	     * Class toggle *
	     * ------------ */
		$(document).on('click', '.classToggle', function() {
			var jThis = $(this);
			var jTarget = $(jThis.data('target'));
			var classString = jThis.data('class');

			if(jTarget.hasClass(classString)) {
				jTarget.removeClass(classString);
			} else {
				jTarget.addClass(classString);
			}
		});


	    /* ---------- *
	     * Checkboxes *
	     * ---------- */
		$(document).on('click', '.checkAll', function() {
			var jThis = $(this);
			var jTarget = $(jThis.data('target'));

			jTarget.prop('checked', true);
		});
		$(document).on('click', '.checkNone', function() {
			var jThis = $(this);
			var jTarget = $(jThis.data('target'));

			jTarget.prop('checked', false);
		});
		$(document).on('change', '.checkToggle', function() {
			var jThis = $(this);
			var jTarget = $(jThis.data('target'));

			if(jThis.is(':checked')) {
				jTarget.prop('checked', true);
			} else {
				jTarget.prop('checked', false);
			}
		});

	});
	
}(jQuery));