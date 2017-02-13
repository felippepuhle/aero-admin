(function ($) {

    /* ---------------------- *
     * Available theme colors *
     * ---------------------- */
    var themeColors = [
        'light', 'dark'
    ];


    /* ------------------------- *
     * Available material colors *
     * ------------------------- */
    var materialColors = [
        'materialize-red', 'red', 'pink', 'purple', 
        'deep-purple', 'indigo', 'blue', 'light-blue', 
        'cyan', 'teal', 'green', 'light-green',
        'lime', 'yellow', 'amber', 'orange', 
        'deep-orange', 'brown', 'grey', 'blue-grey'
    ];


    /* ------------------------------------------ *
     * Append hidden elements to get theme colors *
     * ------------------------------------------ */
    $('body').prepend('<div id="alternativeColor" class="alternative hide"></div>');
    $('body').prepend('<div id="mainColor" class="main hide"></div>');
    $('body').prepend('<div id="themeColor" class="theme hide"></div>');


    $.Colors = function () {
        return {
            themeColors: function() {
                return themeColors;
            },
            materialColors: function() {
                return materialColors;
            },
            theme: function () {
                return $('#themeColor').css('background-color');
            },
            main: function () {
                return $('#mainColor').css('background-color');
            },
            alternative: function () {
                return $('#alternativeColor').css('background-color');
            }
        };
    };

}(jQuery));