(function ($) {

  /* -------- *
   * DOM LOAD *
   * -------- */
	$(document).ready(function() {

    /* ---------- *
     * Mobile nav *
     * ---------- */
		$('.button-collapse').sideNav();


		/* --------------- *
     * Material select *
     * --------------- */
		$('.input-field select').material_select();


		/* ---------- *
     * Datepicker *
     * ---------- */
		$('.datepicker').pickadate({selectYears: 20});


		/* ---------- *
     * Slimscroll *
     * ---------- */
		$('.slimscroll').each(function() {
			var jThis = $(this);

			var options = {};
			$.extend(options, jThis.data());

			jThis.slimScroll(options);
		});


		/* ----- *
     * Modal *
     * ----- */
		$('.modal').modal();


		/* ------------ *
     * Pretty Print *
     * ------------ */
		$('pre').each(function () {
			var jPre = $(this);
			var jCode = jPre.children('code').eq(0);

			jPre.addClass('prettyprint');
			jPre.addClass(jCode.attr('class'));
			jPre.attr('data-language', jCode.attr('class'));

			jPre.html(jCode.html().trim());
		});
		if ($('pre').length > 0) {
			prettyPrint();
		}

	});

}(jQuery));
