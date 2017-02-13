(function ($) {

    /* -------- *
     * DOM LOAD *
     * -------- */
	$(document).ready(function() {

	    /* ---------- *
	     * noUiSlider *
	     * ---------- */
		var slider = document.getElementById('range-input');
		noUiSlider.create(slider, {
			start: [20, 80],
			connect: true,
			step: 1,
			range: {
				'min': 0,
				'max': 100
			},
			format: wNumb({
				decimals: 0
			})
		});


	    /* ----------------- *
	     * Character Counter *
	     * ----------------- */
		$('input#input_text, textarea#textarea1').characterCounter();


	    /* ------------ *
	     * Autocomplete *
	     * ------------ */
		$('input.autocomplete').autocomplete({
			data: {"Apple": null, "Microsoft": null, "Google": 'http://placehold.it/250x250'}
		});

	});

}(jQuery));