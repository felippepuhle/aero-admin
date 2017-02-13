(function ($) {

	$.fn.dataTableExt.oStdClasses.sPageButton = 'btn-flat small waves-effect';

    /* -------------------- *
     * DATATALBES - Columns *
     * -------------------- */
    var getColumns = function(jTable) {
        var columns = [];

        jTable.find('thead > tr > th').each(function () {
            var jColumn = $(this);

            columns.push({
                searchable: (typeof jColumn.data('searchable') !== typeof undefined) ? jColumn.data('searchable') : true,
                orderable: (typeof jColumn.data('orderable') !== typeof undefined) ? jColumn.data('orderable') : true
            });
        });

        return columns;
    };


    /* ------------------- *
     * DATATALBES - Filter *
     * ------------------- */
    var handleFilterDOM= function(jTable) {
      var jTableWrapper = jTable.parents('.dataTables_wrapper').eq(0);
      var jNav = $('<nav>').prependTo(jTableWrapper);
      var jNavWrapper = jTableWrapper.find('.nav-wrapper');
      var jInputField = jTableWrapper.find('.dataTables_filter');

    	// Fix input-field class and positioning
        jInputField.addClass('input-field');
        jInputField.addClass('with-search-bar');
        jInputField.prependTo(jNavWrapper);
        jTableWrapper.find('.dataTables_filter label input').prependTo(jInputField);

        // Remove default text label
        jTableWrapper.find('.dataTables_filter label').remove();

        // Add icons
        jInputField.append('<label for="search"><i class="material-icons">search</i></label>');
        jInputField.append('<i class="material-icons">close</i>');

    	// Add the nav-wrapper inside the <nav> tag
    	jNavWrapper.prependTo(jNav);
    };


    /* ----------------- *
     * Delete All Button *
     * ----------------- */
    var enableOrDisableDeleteAllButton = function() {
        var jDeleteAllButton = $('#btnDeleteAll');

        if($('.crud-app table tbody [type=checkbox]:checked').length > 0) {
            jDeleteAllButton.removeAttr('disabled');
        } else {
            jDeleteAllButton.attr('disabled', 'disabled');
        }
    };


    /* ---------------------- *
     * Lock/unlock the screen *
     * ---------------------- */
    var lockScreen = function() {
        $('.crud-app').Lock({
            background: 'rgba(249,249,249,.5)'
        });
    };

    var unlockScreen = function() {
        $('.crud-app').Unlock();
    };


    /* -------- *
     * DOM LOAD *
     * -------- */
    $(document).ready(function() {
        // Apply DataTables
        $('.datatable').each(function() {
            var jTable = $(this);

            jTable.DataTable({
                order: [],
                columns: getColumns(jTable),
                fnInitComplete: function(oSettings, json) {
                    handleFilterDOM(jTable);
                },
                dom: 
                "<'nav-wrapper'f>" +
                "<''tr>" +
                "<'row no-gutter'" +
                "   <'col s12 m4'i>" +
                "   <'col s12 m8'p>" +
                ">"
            });
        });

        // Enable or disable delete all button
        enableOrDisableDeleteAllButton();
        $('.crud-app [type=checkbox]').on('change', function() {
            setTimeout(enableOrDisableDeleteAllButton, 50);
        });

        // Click event on delete button
        $('.btnDelete').on('click', function() {
            var jButton = $(this);
            var jRow = jButton.parents('tr').eq(0);
            var name = jRow.children('td').eq(1).html();

            var modalContent = '';
            modalContent += '<p>Are you sure you want to delete this item?</p>';
            modalContent += '<p><b>' + name + '</b></p>';

            var modalConfig = {
                hooks: {
                    onOk: function() {
                        lockScreen();

                        setTimeout(function() {
                            var jDataTable = $('.datatable').DataTable();

                            jDataTable.row(jRow).remove().draw();

                            enableOrDisableDeleteAllButton();

                            unlockScreen();

                            Materialize.toast('1 item deleted', 5000, 'success');
                        }, 1000);
                    }
                }
            }

            $.Modal('Delete', modalContent, modalConfig);
        });

        // Click event on delete button
        $('#btnDeleteAll').on('click', function() {
            var jCheckboxes = $('.crud-app table tbody [type=checkbox]:checked');

            var modalContent = '';
            modalContent += '<p>Are you sure you want to delete these items?</p>';
            
            modalContent += '<p>';
            jCheckboxes.each(function() {
                var jCheckbox = $(this);
                var jRow = jCheckbox.parents('tr').eq(0);
                var name = jRow.children('td').eq(1).html();

                modalContent += '<div class="bold">' + name + '</div>';
            });
            modalContent += '</p>'

            var modalConfig = {
                hooks: {
                    onOk: function() {
                        lockScreen();

                        setTimeout(function() {
                            var jDataTable = $('.datatable').DataTable();

                            jCheckboxes.each(function() {
                                var jCheckbox = $(this);
                                var jRow = jCheckbox.parents('tr').eq(0);

                                jDataTable.row(jRow).remove();
                            });

                            jDataTable.draw();


                            $('#chkDeleteAll').prop('checked', false);

                            enableOrDisableDeleteAllButton();
                            
                            unlockScreen();

                            Materialize.toast(jCheckboxes.length + ' items deleted', 5000, 'success');
                        }, 1000);
                    }
                }
            }

            $.Modal('Delete', modalContent, modalConfig);
        });
    });

 }(jQuery));