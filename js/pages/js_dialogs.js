(function ($) {

	$.CustomToast = function () {
		return {
			displayCustomHTMLToast: function() {
				var $toastContent = $('<span>I am toast content</span>');
				Materialize.toast($toastContent, 5000);
			}
		};
	};

}(jQuery));