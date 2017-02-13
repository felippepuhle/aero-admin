(function ($) {

	$.fn.dataTableExt.oStdClasses.sPageButton = 'btn-flat small waves-effect';


    /* -------- *
     * DOM LOAD *
     * -------- */
     $(document).ready(function() {

     	$('.datatable').each(function() {
     		var jTable = $(this);

     		jTable.DataTable({
     			fnInitComplete: function(oSettings, json) {
     				var jTableWrapper = jTable.parents('.dataTables_wrapper').eq(0);

					// Length
					jTableWrapper.find('.dataTables_length').addClass('input-field');
					jTableWrapper.find('.dataTables_length label select').prependTo(jTableWrapper.find('.dataTables_length'));
					jTableWrapper.find('.dataTables_length select').material_select();

			    	// Filter
			    	jTableWrapper.find('.dataTables_filter').addClass('input-field');
			    	jTableWrapper.find('.dataTables_filter').addClass('without-search-bar');
			    	jTableWrapper.find('.dataTables_filter label input').prependTo(jTableWrapper.find('.dataTables_filter'));
			    },
			    language: {
			    	"lengthMenu": "Per page: _MENU_",
			    },
			    dom: 
				    "<'row no-gutter'" +
				    "	<'col s12 m2'l>" +
				    "	<'col s12 offset-m6 m4'f>" +
				    ">" +
				    "<''tr>" +
				    "<'row no-gutter'" +
				    "	<'col s12 m4'i>" +
				    "	<'col s12 m8'p>" +
				    ">"
			});
     	});

     });

 }(jQuery));