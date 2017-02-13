(function ($) {

    /* -------- *
     * DOM LOAD *
     * -------- */
	$(document).ready(function() {


		$('.chips-initial').material_chip({
			readOnly: true,
			data: [
				{
					tag: 'Apple',
				}, 
				{
					tag: 'Microsoft',
				}, 
				{
					tag: 'Google',
				}
			]
		});

		$('.chips-placeholder').material_chip({
			placeholder: 'Enter a tag',
			secondaryPlaceholder: '+Tag',
		});

		$('.chips').material_chip();

	});

}(jQuery));