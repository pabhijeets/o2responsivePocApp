jQuery(function($) {
	setNavHeight();
	
	$('.widget').each(function() {
		// sort out any closed portlets
		if ($(this).hasClass('closed')) {
			$(this).find('.content').hide();
		}
		if ($(this).hasClass('ajax')) {
			var $contblock = $(this).find('.content');
			var ajurl = $contblock.find('a').first().attr('href');
			if (ajurl != undefined) {
				$.ajax({
					url : ajurl,
					success : function(data) {
						$contblock.html(data);
						setNavHeight();
						cX('onload');
					},
					error : function(jqXHR, textStatus, errorThrown) {
					    setTimeout(function(){
							   $contblock.html('<div class=errormsg>Sorry, we can\'t load this information at the moment, please come back later.</div>');	
							}, 10000)						
					}
				});
			} else {
				$contblock.html('<div class=errormsg>Content source is undefined.</div>');
			}
			$(this).removeClass('ajax');
		}
	});

	$('.widget .hdr').click(function() {
		var $portlet = $(this).parent();
		$portlet.toggleClass("closed")
		$portlet.find("div.content").slideToggle('fast', function(){setNavHeight()})
		
	})

	$('.tooltip img').infoBox();

	$('a.popupWindow').live('click', function(e) {
	  e.preventDefault();
	  var popupUrl = $(this).attr('href')
	  var popupWin = window.open(popupUrl, "o2popup","scrollbars=yes,toolbar=no,menubar=no,status=no,width=770,height=600");
	  popupWin.focus();
  })
  
  $("form.validated").validator({
	  position: 'top left', 
	  messageClass: 'validationError', 
	  inputEvent: 'change',
	  onFail: function(e, els){
	  	 $.each(els, function(){
	    	var $el = $(this);
	    	var $ip = $el[0].input;	    	
	    	var errormsg='';
	    	var $group = $ip.closest('fieldset.required');
	    	var partOfGroup = $group.length > 0 ? true:false;
	    	if(partOfGroup){
	          errormsg='One of these requires a value';
	    	}else if($ip.attr('type') == "checkbox"){
	    	  errormsg='This field needs to be checked';
	    	}else{
             errormsg='This field requires a value';
	    	}
	    	var $msgblock;
	    	if(partOfGroup){
	    	  	$msgblock = $group.find('input').first().siblings('.validationError');
	    	  	if($msgblock.length==0){
		    	  $group.find('input').first().parent().prepend('<div class="validationError" style="display: none"></div>');
		    	  $msgblock = $group.find('input').first().siblings('.validationError');	
		    	}
		    	$group.find('input').addClass('invalid');
	    	}else{
	    		$ip.addClass('invalid');
		    	$msgblock = $ip.siblings('.validationError');
		    	if($msgblock.length==0){
		    	  $ip.parent().prepend('<div class="validationError" style="display: none"></div>');
		    	  $msgblock = $ip.siblings('.validationError');	
		    	}
		    }
	    	$msgblock.empty().append(errormsg).slideDown(200);
	    })  
	    return false;
	  },
	  onSuccess: function(e, els){
	  	 $.each(els, function(){
	  	    var $ip = $(this);
	  	    var $group = $ip.closest('fieldset.required');
	    	var partOfGroup = $group.length > 0 ? true:false;
	    	var $msgblock;
	    	if(partOfGroup){
	    	  $msgblock = $group.find('input').first().siblings('.validationError');
	          $msgblock.slideUp(200).empty();	
	          $group.find('input').removeClass('invalid');
	    	}else{	    	  
	    	  $msgblock = $ip.siblings('.validationError');
	          $msgblock.slideUp(200).empty();	
	    	  $ip.siblings('.fieldError').show();
	    	}
	    	
	    })
	  }
	}); 
	
	$.tools.validator.fn('input[type="text"].required, input[type="password"].required', 'Please enter $1', function(el, value) {
		var ttl = el.attr('title');
		if(ttl == undefined || ttl == ""){
			 ttl = "a value";
		}
		return /([^\s])/.test(value) ? true : [ttl];
	});	
	
	$.tools.validator.fn('input[type="checkbox"].required', "Please check $1", function(el, value) {
		var ttl = el.attr('title');
		if(ttl == undefined || ttl == ""){
			 ttl = "this checkbox";
		}
		return(el.prop('checked') ? true : [ttl]);
	});
	
	$.tools.validator.fn('fieldset.required input', "Please check $1", function(el, value) {
	    var pass = false;
		el.closest('fieldset.required').find('input').each(function(){
		  if($(this).val() != '') pass = true;
		});
		return(pass ? true : 'One of this group of fields needs to be filled in');
	});
	
})

var accordion = function(){
  var itm = jQuery(this).parent();
  jQuery(this).parent().children('div').slideToggle(250, function(){itm.toggleClass('open')});
}

		
function setNavHeight(){
  if(!this.minimumHeight){
    this.minimumHeight = jQuery('.o2body > .col1').outerHeight(true);
  }
		
  if((jQuery('.o2body > .col2').outerHeight(true) > this.minimumHeight) && (jQuery('.o2body > .col1').height() != jQuery('.o2body > .col2').height())){
    jQuery('.o2body > .col1').height(jQuery('.o2body > .col2').height())	
  }
}		
		  
var basketRecalcCallInProgress;

function recalculateBasketSummary(recalcUrl,updateMarkup) {
    if (basketRecalcCallInProgress != null) {
        basketRecalcCallInProgress.abort();
    }    
    jQuery("#summary .update").html(updateMarkup);
    basketRecalcCallInProgress = jQuery.ajax({
        type: 'POST',
        url: recalcUrl,
        data: jQuery('#boltOnForm').serialize(),
        complete: function(calcs, status) {
            if(status == "error") {
                jQuery('#boltOnsSummaryAndTotal').html('<div class="error">An error has occured updating your totals</div>');
            }else{
                jQuery('#boltOnsSummaryAndTotal').html(calcs.responseText);
                jQuery('#boltOnsSummaryAndTotal .tooltip img').infoBox();
                jQuery('#summary').trigger('update')
            }
        }
    });
}

jQuery(document).ready(function() {
    addSecondaryNavMarkup();

    jQuery(window).resize(function() {
        if(jQuery('#header-consumer').find('#nav-secondary').length === 0) {
            jQuery('.nav-primary').after('<nav id="nav-secondary" class="js-injection"><div class="grid-inner"><ul></ul></div></nav>');
            addSecondaryNavMarkup();
        }
        jQuery("#nav-secondary").show();
    });
});

function addSecondaryNavMarkup() {
    jQuery("#secondoryNav div").clone().appendTo(jQuery("#nav-secondary > div > ul"));

    jQuery(".nav-consumer").on('click', '.show-more', showMore);
    jQuery("#nav-secondary").on('click', 'a', reloadPage);

    var $secondaryNavShowMore = jQuery("#nav-secondary").find('.show-more');
    jQuery("#nav-secondary").show();


    $secondaryNavShowMore.on('mouseenter focusin', showMoreSecondary);
    $secondaryNavShowMore.on('mouseleave', hideMoreSecondary);
    $secondaryNavShowMore.on('focusout', 'a', hideMoreSecondaryOnFocusOut);
}
