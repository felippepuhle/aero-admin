(function ($) {

  /* ------------- *
   * Generate HTML *
   * ------------- */
  var generateFixedNavbarHtml = function() {
		var themeHtml = '';
		if($('#nav-content').length < 1) {
			return themeHtml;
		}

		themeHtml += '<div class="title">Fixed Navbar</div>';
		themeHtml += '<div class="row">';
		themeHtml += '	<div class="center-align">';
		themeHtml += '		<div class="switch">';
		themeHtml += '			<label>';
		themeHtml += '				No';
		themeHtml += '				<input type="checkbox" name="fixedNavbar" />';
		themeHtml += '				<span class="lever"></span>';
		themeHtml += '				Yes';
		themeHtml += '			</label>';
		themeHtml += '		</div>';
		themeHtml += '	</div>';
		themeHtml += '</div>';

		return themeHtml;
  };

	var generateThemeStyleHtml = function() {
		var themeHtml = '';

		themeHtml += '<div class="title">Fluid</div>';
		themeHtml += '<div class="row">';
		themeHtml += '	<div class="center-align">';
		themeHtml += '		<div class="switch">';
		themeHtml += '			<label>';
		themeHtml += '				No';
		themeHtml += '				<input type="checkbox" name="themeStyle" />';
		themeHtml += '				<span class="lever"></span>';
		themeHtml += '				Yes';
		themeHtml += '			</label>';
		themeHtml += '		</div>';
		themeHtml += '	</div>';
		themeHtml += '</div>';

		return themeHtml;
	};
	var generateThemeColorHtml = function() {
		var themeHtml = '';

		themeHtml += '<div class="title">Lights</div>';
		themeHtml += '<div class="row">';
		themeHtml += '	<div class="center-align">';
		themeHtml += '		<div class="switch">';
		themeHtml += '			<label>';
		themeHtml += '				Off';
		themeHtml += '				<input type="checkbox" name="themeColor" />';
		themeHtml += '				<span class="lever"></span>';
		themeHtml += '				On';
		themeHtml += '			</label>';
		themeHtml += '		</div>';
		themeHtml += '	</div>';
		themeHtml += '</div>';

		return themeHtml;
	};
	var generateMainColorHtml = function() {
		var mainHtml = '';

		mainHtml += '<div class="title">Main Color</div>';
		mainHtml += '<div class="row">';
		$.Colors().materialColors().forEach(function(color) {
			mainHtml += '<div class="change-'+ color +' left" data-color="'+ color +'">';
			mainHtml += '	<input class="with-gap '+ color +'" name="mainColor" type="radio" id="main-'+ color +'" value="'+ color +'" />';
			mainHtml += '	<label for="main-'+ color +'"></label>';
			mainHtml += '</div>';
		});
		mainHtml += '</div>';

		return mainHtml;
	};
	var generateAlternativeColorHtml = function() {
		var alternativeHtml = '';

		alternativeHtml += '<div class="title">Alternative Color</div>';
		alternativeHtml += '<div class="row">';
		$.Colors().materialColors().forEach(function(color) {
			alternativeHtml += '<div class="change-'+ color +' left" data-color="'+ color +'">';
			alternativeHtml += '	<input class="with-gap '+ color +'" name="alternativeColor" type="radio" id="alternative-'+ color +'" value="'+ color +'" />';
			alternativeHtml += '	<label for="alternative-'+ color +'"></label>';
			alternativeHtml += '</div>';
		});
		alternativeHtml += '</div>';

		return alternativeHtml;
	};


  /* ----------- *
   * Append HTML *
   * ----------- */
	var appendHTML = function() {
		if ($('#theme-switcher').length > 0) {
			return;
		}

		var html = '';
		html += '<div id="theme-switcher">';
		html += '	<div class="theme-button valign-wrapper classToggle" data-target="#theme-switcher" data-class="active">';
		html += '		<i class="material-icons valign">menu</i>';
		html += '	</div>';
		html += '	<div class="theme-title">Theme Switcher</div>';
		html += '	<div class="theme-content">';
		html += 		generateFixedNavbarHtml();
		html += 		generateThemeStyleHtml() + generateThemeColorHtml();
		html +=			generateMainColorHtml() + generateAlternativeColorHtml();
		html += '	</div>';
		html += '</div>'

		$('body').prepend(html);
	};


  /* --------------- *
   * Apply Listeners *
   * --------------- */
	var applyListeners = function() {
		$(document).on('change', '#theme-switcher [name="fixedNavbar"]', function() {
			var jThis = $(this);

			if(jThis.is(':checked')) {
				$('#nav-content').addClass('navbar-fixed');
			} else {
				$('#nav-content').removeClass('navbar-fixed');
			}

      if (jQuery().TableOfContents) {
  		  $.TableOfContents().reload();
      }
		});

		$(document).on('change', '#theme-switcher [name="themeStyle"]', function() {
			var jThis = $(this);

			if(jThis.is(':checked')) {
				$('main').removeClass('container');
			} else {
				$('main').addClass('container');
			}
		});

		$(document).on('change', '#theme-switcher [name="themeColor"]', function() {
			var jThis = $(this);

			var themeColor = '';
			if(jThis.is(':checked')) {
				themeColor = 'css/themes/light.css';
			} else {
				themeColor = 'css/themes/dark.css';
			}

			$('#ssThemeColor').attr('href', themeColor);
		});

		$(document).on('change', '#theme-switcher [name="mainColor"]', function() {
			$('#ssMainColor').attr('href', 'css/themes/main/'+ $(this).val() +'.css');
		});

		$(document).on('change', '#theme-switcher [name="alternativeColor"]', function() {
			$('#ssAlternativeColor').attr('href', 'css/themes/alternative/'+ $(this).val() +'.css');
		});
	};


  /* -------------------------- *
   * Verify if is a light color *
   * -------------------------- */
	var isLight = function(color) {
		var r,b,g,hsp;

		if (color.match(/^rgb/)) {
			color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
			r = color[1];
			g = color[2];
			b = color[3];
		} else {
		      color = +("0x" + color.slice(1).replace(
		      	color.length < 5 && /./g, '$&$&'
		      ));
		      r = color >> 16;
		      b = color >> 8 & 255;
		      g = color & 255;
		}

    hsp = Math.sqrt(
    	0.299 * (r * r) +
    	0.587 * (g * g) +
    	0.114 * (b * b)
    );

		return hsp>127.5;
	};


  /* --------------- *
   * Select defaults *
   * --------------- */
	var selectDefaults = function() {
		if($('#nav-content').hasClass('navbar-fixed')) {
			$('#theme-switcher [name="fixedNavbar"]').attr('checked', 'true');
		} else {
			$('#theme-switcher [name="fixedNavbar"]').removeAttr('checked');
		}

		if($('main').hasClass('container')) {
			$('#theme-switcher [name="themeStyle"]').removeAttr('checked');
		} else {
			$('#theme-switcher [name="themeStyle"]').attr('checked', 'true');
		}

		if(isLight($.Colors().theme())) {
			$('#theme-switcher [name="themeColor"]').attr('checked', 'true');
		} else {
			$('#theme-switcher [name="themeColor"]').removeAttr('checked');
		}

		$('#theme-switcher [name="mainColor"]').each(function() {
			if($.Colors().main() === $(this).css('background-color')) {
				$(this).attr('checked', true);
			}
		});

		$('#theme-switcher [name="alternativeColor"]').each(function() {
			if($.Colors().alternative() === $(this).css('background-color')) {
				$(this).attr('checked', true);
			}
		});
	};


  /* ---- *
   * Init *
   * ---- */
	appendHTML();
	applyListeners();
	selectDefaults();

}(jQuery));
