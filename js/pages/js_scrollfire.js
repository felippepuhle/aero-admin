(function ($) {

    /* -------- *
     * DOM LOAD *
     * -------- */
	$(document).ready(function() {

		var options = [
		{selector: '#staggered-test', offset: 50, callback: function() {
			Materialize.toast("This is our ScrollFire Demo!", 1500);
		}},
		{selector: '#staggered-test', offset: 205, callback: function() {
			Materialize.toast("Please continue scrolling!", 1500);
		}},
		{selector: '#staggered-test', offset: 500, callback: function() {
			Materialize.showStaggeredList("#staggered-test");
		}}
		];
		
		Materialize.scrollFire(options);

	});

}(jQuery));