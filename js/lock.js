(function ($) {

    /* ---- *
     * Lock *
     * ---- */
    $.fn.Lock = function (options) {
        /* -------------- *
         * Default config *
         * -------------- */
        var defaults = {
            zIndex: '9995',
            background: 'rgba(249,249,249,1)',
            size: 'medium'
        };


        /* ------------- *
         * Custom config *
         * ------------- */
        var options = options || {};
        $.extend(defaults, options);


        /* ------------ *
         * Spinner HTML * 
         * ------------ */
        var spinnerHtml = '';
    	spinnerHtml += '<div class="preloader-wrapper active">';
		spinnerHtml += '	<div class="spinner-layer spinner-blue">';
		spinnerHtml += '		<div class="circle-clipper left">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="gap-patch">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="circle-clipper right">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '	</div>';
		spinnerHtml += '	<div class="spinner-layer spinner-red">';
		spinnerHtml += '		<div class="circle-clipper left">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="gap-patch">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="circle-clipper right">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '	</div>';
		spinnerHtml += '	<div class="spinner-layer spinner-yellow">';
		spinnerHtml += '		<div class="circle-clipper left">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="gap-patch">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="circle-clipper right">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '	</div>';
		spinnerHtml += '	<div class="spinner-layer spinner-green">';
		spinnerHtml += '		<div class="circle-clipper left">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="gap-patch">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '		<div class="circle-clipper right">';
		spinnerHtml += '			<div class="circle"></div>';
		spinnerHtml += '		</div>';
		spinnerHtml += '	</div>';
		spinnerHtml += '</div>';


        return this.each(function () {
            var jElement = $(this);

            if (jElement.find('.lock').length === 0) {
            	// Main element
            	var lockWrapper = $('<div>', {
                    class: 'lock valign-wrapper',
                    css: {
                        display: 'none',
                        position: (jElement.is($('body'))) ? 'fixed' : 'absolute',
                        zIndex: defaults.zIndex,
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                        cursor: 'wait',
                        background: defaults.background
                    }
                });

            	// Alignment element
            	var lockVAlignCenter = $('<div>', {
            		class: 'valign center',
            		css: {
            			width: '100%'
            		}
            	});

            	// Handle HTML
            	lockVAlignCenter.html(spinnerHtml);
            	lockWrapper.html(lockVAlignCenter);
            	jElement.prepend(lockWrapper);

            	// Spinner size
            	lockVAlignCenter.find('.preloader-wrapper').addClass(defaults.size);
            }

            jElement.find('.lock').stop().fadeIn(400);
        });
    };


    /* ------- *
     * Unlock *
     * ------ */
    $.fn.Unlock = function () {
        return this.each(function () {
            var jElement = $(this);

            jElement.find('.lock').stop().fadeOut(300, function () {
                $(this).remove();
            });
        });
    };

}(jQuery));