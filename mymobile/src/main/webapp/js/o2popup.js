jQuery.fn.o2popup = function(options){

	var windowHeight = jQuery(window).height();
    var windowWidth = jQuery(window).width();
    var popupHeight = jQuery('.o2popup').height();
    var popupWidth = jQuery('.o2popup').width();
    var popupname;

	jQuery('.o2popup').hide();
	jQuery('.o2overlay').hide();

    return this.each(function(i) {
    	
    	jQuery(this).click(function() {

    		popupname = jQuery(this).attr('href');
    		if (jQuery('.o2overlay').is(':visible')) {
				hidePopup();
				return false;
			}
			else {
				displayPopup();
				return false;
			}

    	})

    	jQuery('.o2overlay, .closeButton').click(function(){
			hidePopup();
			return false;
		});

		jQuery(document).bind('keydown', function(e) { 
			if (jQuery('.o2overlay').is(':visible')) {
				if (e.keyCode == 27) {
					hidePopup();
					return false;
				}			
			}
		});

		jQuery(window).resize(function() {
			windowHeight = jQuery(window).height();
			windowWidth = jQuery(window).width();
			if (jQuery('.o2overlay').is(':visible')) {
				displayPopup();
				return false;
			}
		}).resize();

    });

    function displayPopup() {
		jQuery(popupname).animate({
			"top": windowHeight/2-popupHeight/2, 
		 	"left": windowWidth/2-popupWidth/2},
			{
		 		duration: 'fast', 
		 		queue: false
			})
		jQuery('.o2overlay').fadeIn(200, function() {
			jQuery(popupname).fadeIn('slow');
		});
	}

	function hidePopup() {
		jQuery(popupname).fadeOut('slow', function() {
			jQuery('.o2overlay').fadeOut(200);
		});
	}

};