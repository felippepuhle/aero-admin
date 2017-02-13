(function ($) {

	/* ----- *
     * Modal *
     * ----- */
    $.Modal = function (title, content, custom) {

    	title = title || '';
    	content = content || '';


		  /* ------ *
       * Config *
       * ------ */
      var config = {
      	id: $.randomID(),
      	fixedFooter: false,
        closed: false,
      	dismissible: true,
      	opacity: .5,
          classes: {
          	ok: 'waves-effect waves-green btn-flat',
          	cancel: 'waves-effect waves-red btn-flat'
          },
          texts: {
          	ok: 'Ok',
          	cancel: 'Cancel'
          },
          hooks: {
          	onShow: function() { },
          	onClose: function() { },
          	onOk: null,
          	onCancel: null
          }
      };

      var custom = custom || {};
      $.extend(config, custom);


		  /* --------------- *
       * Create the HTML *
       * --------------- */
      var createHTML = function() {
        	var html = '';

        	html += '<div id="' + config.id + '" class="' + generateModalClass() + '">';
    			html += '	<div class="modal-content">' + generateModalContentHTML() + '</div>';
    			html += generateModalFooterHTML();
    			html += '</div>';

    			$('body').append(html);
        };

        var generateModalClass = function() {
        	var modalClass = 'modal';

        	if(config.fixedFooter !== false) {
        		modalClass += ' modal-fixed-footer';
        	}

        	return modalClass;
        };

        var generateModalContentHTML = function() {
        	var contentHtml = '';

        	if(title.length > 0) {
        		contentHtml += '<h4 id="title">' + title + '</h4>';
        	}

          contentHtml += '<div id="content">' + content + '</div>';

        	return contentHtml;
        };

        var generateModalFooterHTML = function() {
        	var footerHtml = '';

        	if(config.hooks.onOk === null && config.hooks.onCancel === null) {
        		return footerHtml;
        	}

    			footerHtml += '<div class="modal-footer">';
    			footerHtml += '   <a id="cancel" class="modal-action modal-close ' + config.classes.cancel + '">' + config.texts.cancel + '</a>';
    			footerHtml += '   <a id="ok" class="modal-action modal-close ' + config.classes.ok + '">' + config.texts.ok + '</a>';
    			footerHtml += '</div>';

    			return footerHtml;
        };


		    /* --------------- *
         * Apply listeners *
         * --------------- */
        var applyListeners = function() {
        	var jModal = $('#' + config.id);
        	var jOnOk = jModal.find('#ok');
        	var jOnCancel = jModal.find('#cancel');

          jModal.modal({
            dismissible: config.dismissible,
            opacity: config.opacity,
            ready: config.hooks.onShow,
            complete: config.hooks.onClose
          });

        	if(typeof config.hooks.onOk === 'function') {
            jOnOk.off('click');
        		jOnOk.on('click', function(event) {
        			config.hooks.onOk(event);
        		});
        	} else {
        		jOnOk.attr('href', config.hooks.onOk);
        	}

        	if(typeof config.hooks.onCancel === 'function') {
            jOnCancel.off('click');
        		jOnCancel.on('click', function(event) {
        			config.hooks.onCancel(event);
        		});
        	} else {
        		jOnCancel.attr('href', config.hooks.onCancel);
        	}
        };


		    /* -------------------- *
         * Open/close the modal *
         * -------------------- */
        var openModal = function() {
        	var jModal = $('#' + config.id);

        	jModal.modal('open');
        };

        var closeModal = function() {
        	var jModal = $('#' + config.id);

        	jModal.modal('close');
        };


        /* --------------------- *
         * Dynamic configuration *
         * --------------------- */
        var updateModal = function() {
            var jModal = $('#' + config.id);
            var jTitle = jModal.find('#title');
            var jContent = jModal.find('#content');

            jTitle.html(title);
            jContent.html(content);

            applyListeners();
        };


        /* ------- *
         * Setters *
         * ------- */
        var setTitle = function(parTitle) {
            title = parTitle;

            updateModal();
        };

        var setContent = function(parContent) {
            content = parContent;

            updateModal();
        };

        var setConfig = function(parCustom) {
            $.extend(custom, parCustom);
            $.extend(config, custom);

            updateModal();
        };


        /* ------- *
         * Getters *
         * ------- */
        var getTitle = function() {
            return title;
        };

        var getContent = function() {
            return content;
        };

        var getConfig = function() {
            return config;
        };


		    /* ---------- *
         * Initialize *
         * ---------- */
        createHTML();
        applyListeners();
        if(config.closed === false) {
            openModal();
        }


        /* --- *
         * API *
         * --- */
        return {
            open: openModal,
            close: closeModal,
            setTitle: setTitle,
            setContent: setContent,
            setConfig: setConfig,
            getTitle: getTitle,
            getContent: getContent,
            getConfig: getConfig
        }
    };


    /* --------- *
     * Listeners *
     * --------- */
    $(document).ready(function() {

        /* ----------------------- *
         * Open a new modal button *
         * ----------------------- */
        $(document).on('click', '.modal-trigger', function() {
            var jTriggerButton = $(this);
            var jConfig = jTriggerButton.data();

            // Title
            if(typeof jConfig.title === typeof undefined) {
                jConfig.title = '';
            }

            // Content
            if(typeof jConfig.content === typeof undefined) {
                jConfig.content = '';
            }
            if(typeof jConfig.content !== typeof undefined && $.isValidSelector(jConfig.content)) {
                jConfig.content = $(jConfig.content).html();
            }

            // Hooks
            if(typeof jConfig.hooks === typeof undefined) {
                jConfig.hooks = {};
            }
            if(typeof jConfig.onshow !== typeof undefined) {
                jConfig.hooks.onShow = jConfig.onshow;
            }
            if(typeof jConfig.onclose !== typeof undefined) {
                jConfig.hooks.onClose = jConfig.onclose;
            }
            if(typeof jConfig.onok !== typeof undefined) {
                jConfig.hooks.onOk = jConfig.onok;
            }
            if(typeof jConfig.oncancel !== typeof undefined) {
                jConfig.hooks.onCancel = jConfig.oncancel;
            }

            // Open modal
            var modal = $.Modal(jConfig.title, jConfig.content, jConfig);
        });

    });

}(jQuery));
