//-------------------------------------------------
//
//-------------------------------------------------

(function( $ ){
  
  $.fn.panelFloat = function(opts, callback) {  	
      var options = {
      	'topBoundary' : '',
      	'btmBoundary' :'',
      	'container' : '',
      	'type': 'relative'
      };           
      
      function setPosition(panel){
		  var panelHeight = panel.outerHeight(true);
		  var scrollTop = $(window).scrollTop();
		  var topPosition = Math.max(0, scrollTop - options.topBoundary);
		  topPosition = Math.min(topPosition, (options.btmBoundary - panelHeight));
		  panel.css('top', topPosition);
		}      
      
      return this.each(function() {  
        var $this = $(this);     

        if ( opts ) { 
          $.extend( options, opts );
        }          
        
        var $container
        if(options.type=='relative' && options.container == ''){
          $container = $this.parent();	
          $this.css({'right': 0, 'position': 'absolute' });
          $container.css({'position':'relative', 'zoom':1})
        }else if(options.container == ''){
          $container = $('body');
          $this.css({'top': $this.position().top, 'left': $this.position().left, 'position': 'fixed' });	
        }else{
        	 $this.css({'right': 0, 'position': 'absolute' });
          $container = $this.closest(options.container);	
          $container.css({'position':'relative', 'overflow':'hidden'})
        }
        
        
        if(options.topBoundary==''){
          options.topBoundary = $container.offset().top;
        }
        if(options.btmBoundary==''){
        	 $container.css({'overflow':'hidden'})
          options.btmBoundary = $container.innerHeight();
          $container.css({'overflow':''})
        }
               
        
        //init the panel position
        setPosition($this);
        
        $(window).scroll(function(event) {
          setPosition($this);
        });
        $this.bind('update', function(event) {
          setPosition($this);
        });
        
     });
  };
})( jQuery );



(function( $ ){
	// This function inserts an international tariff selector on the page
  
  $.fn.internationalTariffSelector = function(opts, callback) {  	
      var options = {
        'dataurl': 'https://static.o2.co.uk/www/js/json/rates.json',
      	'jsonpCallback' : 'loadRates'
      };     
     

      return this.each(function() {  
        var $this = $(this);     
        
        function injectMarkup(){
          $this.append('<div class="internationalTariffSelector"><h2>International Charges</h2><div class="innercontainer"></div></div>');
          $this.find('.internationalTariffSelector .innercontainer').append('<p>Choose a country to check prices:</p>');
          $this.find('.internationalTariffSelector .innercontainer').append('<form><select></select></form>');	
          $this.find('.internationalTariffSelector .innercontainer').append('<div class="countryIdentifier"><img class="flag" title="" alt="" src=""/><h3 id="country" class="country">Country</h3></div>');
          $this.find('.internationalTariffSelector .innercontainer').append('<table id="rates" class="rates"><tr><th>Landlines<div>per minute</div></th><th>Mobiles<div>per minute</div></th><th>Texts<div>per message</div></th></tr><tr><td class="landlineRate">0.0p</td><td class="mobileRate">0.0p</td><td class="textRate">0.0p</td></tr></table>');
			 $this.find('.internationalTariffSelector .innercontainer').append('<p>Prices are for calls and texts made from the UK</p>');															
        }
        function transposeData(data){
        	 var $sel = $this.find('select');
          $.each(data.rates, function(i, item){
           $sel.append('<option>'+item.country+'</option');
           if(item.isDefault=="true"){
           	 setTariff(item);
           	 $sel.children().last().prop('selected', true);
           }
           $sel.children().last().attr('value', item.country).data('tariffs',item);	
          });   	
        }
        function setInteraction(){
          var $sel = $this.find('select');
          $sel.change(function(){
            setTariff($(this).find('option:selected').data('tariffs'))	
          })	
        }
        function setTariff(data){
          var $cont=$this.find('.internationalTariffSelector .innercontainer');
          $cont.find('img.flag').attr('src', data.image);
          $cont.find('h3.country').text(data.country);
          $cont.find('table.rates .landlineRate').text(data.landline)
          $cont.find('table.rates .mobileRate').text(data.mobile)
          $cont.find('table.rates .textRate').text(data.text)
        }
                 
        if ( opts ) { 
          $.extend( options, opts );
        }    
         
        if($this.data('datainjected')){
          if (typeof callback == 'function') { 
	         callback.call(this);
	       } 
        }else{          
	        $.ajax({
	          url: options.dataurl,
	          dataType: 'jsonp',
	          jsonpCallback: options.jsonpCallback,
	          success: function(data, textStatus, jqXHR){
	          	injectMarkup();
	            transposeData(data);
	            setInteraction();
	            $this.data('datainjected', true)
	            if (typeof callback == 'function') { 
	              callback.call(this);
	            }         
	          }
	        });
	      }
     });
  };
})( jQuery );


(function( $ ){
	
  
  $.fn.dataBoltonController = function(opts) {  	
      var options = {
      	'deviceSelector': 'select.devicetype',
      	'boltonSelector': 'input[type="button"]'
      };      

      return this.each(function() {  
        
        var $thisController = $(this);      
        if ( opts ) { 
          $.extend( options, opts );
        }                
        
        var $deviceSelect = $thisController.find(options.deviceSelector);
        var $boltonSelect = $thisController.find(options.boltonSelector);    
        var preselectedDevice;
        if($deviceSelect.is('select')) {
          preselectedDevice = $deviceSelect.find('option:selected').val();
        }
        var $preSelectedDeviceWarningMsg = $thisController.find('.warningmsg.'+preselectedDevice)
        var $tariffsContainer = $thisController.closest('.tariffs');
	     var isPartOfTariffList = ($tariffsContainer.length > 0)? true:false; 
	     if(isPartOfTariffList){   
          var $tariffContainer = $thisController.closest('.tariff');
          var tariffId = $tariffContainer.attr('id');
        }

        function showSingleTariffandBolton(element){
	        $tariffContainer.find('.tariffandbolton').hide();         
	        $tariffElem = $tariffContainer.find(element);
	        $tariffElem.show();        
	      }        
        
        $deviceSelect.change(function(e){       
	        e.preventDefault();
	        var $this = $(this);
	        var selectval = $this.val();
	              
	        if((preselectedDevice == "IPHONE" || preselectedDevice == "BLACKBERRY") && selectval != preselectedDevice){
	          $preSelectedDeviceWarningMsg.slideDown('fast');
	        }else{
	          $preSelectedDeviceWarningMsg.slideUp('fast');
	        }          
           var $boltonGroups = $thisController.find('.boltongroups');
           
           $boltonGroups.children().hide();
           $boltonGroups.find('.'+selectval).show();
	      });
	      
	      $($boltonSelect).click(function(e){
	        if(isPartOfTariffList){
	          showSingleTariffandBolton('.'+tariffId+'_'+$(this).attr('name'))
	        }
	      });        
     });
  };
})( jQuery );



(function( $ ){
  
  $.fn.drawerController = function(opts) {  	
    var options = {
        'trigger' : 'click',
        'wrapperClass' : 'tariff',
        'drawerClass' : 'drawer',
        'singleDrawer': true,
        'alignPointer': true,     	
        'pointerOffset': {'left':0, 'top':0},
        'closeTarget': '.close'
      };
      
      
      var $trigger;  
      

      function toggleDrawer($drawer, triggerType){
        
        if($trigger.is('input[type="radio"]')){
        	 var fldname = $trigger.attr('name')
        	 var $scope = $(document).find('input[name="'+fldname+'"]').parent().find('.'+options.drawerClass)
        	 showSingleDrawer($drawer, $scope)
        }else if($trigger.is('input[type="checkbox"]')){
        	 if($trigger.prop('checked')){        	 	
        	 	openDrawer($drawer)
        	 }else{
            closeDrawer($drawer)
          }	
        }else{
        	 if($drawer.data('drawerstate') == 'open'){
			   closeDrawer($drawerToOpen);
			 }else{
			   openDrawer($drawerToOpen);
			 }	
        }	
      }      
      
      function openDrawer($drawer){
        $drawer.closest('tr.collapsed').show();
        var $pointer = $drawer.find('.pointer');
        $pointer.hide();
        $drawer.data('drawerstate', 'open').slideDown(function(){
          //ie6&7 has an issue with this pointer alignment...ignoring poter positioning for now until a fix is found
          if(!($.browser.msie && $.browser.version < 8)){
            if(options.alignPointer){
             alignPointer($drawer, $pointer, $trigger);
            }	
            $pointer.show();
          }
          scrollDrawerIntoView($drawer);
        })
        $drawer.find(options.closeTarget).one('click', function(e){                  
	        e.preventDefault();
	        closeDrawer($drawer);
	      })
        
      }
      function closeDrawer($drawer){
      	var $pointer = $drawer.find('.pointer');
      	$pointer.hide();
      	$drawer.data('drawerstate', 'closed').slideUp(function(){
      	  $drawer.closest('tr.collapsed').hide();
      	})
      }
      
      function alignPointer($drawer, $pointer, $alignWith){
        $drawer.css({'position': 'relative'});
        var alignWithPos = {left: ($alignWith.offset().left + $alignWith.width()/2) - $pointer.width()/2, top: $drawer.offset().top - $pointer.height()};
        var drawerPos = {left: $drawer.offset().left, top: $drawer.offset().top};
        $pointer.css({left:alignWithPos.left-drawerPos.left+options.pointerOffset.left, top:alignWithPos.top-drawerPos.top+options.pointerOffset.top});
      }
      
      function showSingleDrawer($drawerToOpen, $scope){
        var openthedrawer = true;
        if($scope==undefined){ $scope = $('.'+options.drawerClass) }
		  $scope.each(function(){
		    if($(this).data('drawerstate') == 'open'){
			   if($(this).get(0)===($drawerToOpen.get(0))){
			     openthedrawer = false;
			   }
		      closeDrawer($(this));		            
		    }
		  });
		  if(openthedrawer) openDrawer($drawerToOpen);	
      } 
      
      function closeAllRadioDrawers(event){
        var $radgrp = event.data.radiogroup;
        $radgrp.each(function(){
  	       var $drawer = $(this).data('attachedDrawer');
  	       if($drawer && $drawer.data('drawerstate') == 'open'){
            closeDrawer($drawer);		            
          }	
  	     }) 	
      }      

      function allRadiosCloseDrawer($radiogroup){
        $radiogroup.each(function(){
	     	   if(!$(this).hasClass('drawercontrol')){
	     	     $(this).unbind('change', closeAllRadioDrawers);
	     	     $(this).bind('change', {radiogroup: $radiogroup}, closeAllRadioDrawers);
	     	   }	
	     	 })	
      }
      function scrollDrawerIntoView($drawer){
        
        var scrollPos = $(window).scrollTop();
        if($(window).height() < $drawer.position().top + $drawer.height()){
        	var winHeight = $(window).height();
        	var drawerTop = $drawer.offset().top;
        	var drawerPos = drawerTop - $(window).scrollTop();
        	var drawerHeight = $drawer.height();
        	if(drawerPos+drawerHeight > winHeight){
        	  $('html').animate({scrollTop: drawerTop-90}, 'slow');
        	}
        }
        
        
      }
           
      return this.each(function() {  
        
        var $this = $(this);      
        if ( opts ) { 
          $.extend( options, opts );
        }
        if($this.is('input[type="radio"]')){
        	 options.trigger = 'change';
	     	 //bind a close function to any radios without drawer controller 
	     	 $radiogroup = $('input[name="'+$this.attr('name')+'"]');
	     	 allRadiosCloseDrawer($radiogroup);
	     }
        
        $this.bind(options.trigger, function(e){
        	  var drawerid = "";
	        if($this.is('a')){
	          e.preventDefault();
	          $(this).blur();
	          drawerid = $(this).attr('href');	        
	        }
	 
	        $trigger = $(this);
	             
	        if((drawerid!="" && $(drawerid).length > 0) ){
	        	$drawer = $(drawerid)
	        }else{
	          $drawer = $(this).closest('.'+options.wrapperClass).find('.'+options.drawerClass);	
	        }
	        $this.data('attachedDrawer', $drawer);         
	        if(options.singleDrawer){
	        	showSingleDrawer($drawer);       	
		     }else{
		       toggleDrawer($drawer);
          }	
                   
	      })  
	      
      }); 
  };
	
})( jQuery );



(function( $ ){
  
  $.fn.infoBox = function(opts) {  	
      var options = {
      	'dynamic' : true
      };           
      
            
      
      return this.each(function() {  
        var $this = $(this);     

        if ( opts ) { 
          $.extend( options, opts );
        }          
        $this.tooltip({
			effect : 'fade',
			fadeOutSpeed : 100,
			predelay : 400,
			position : 'top center',
			offset: [-10, 100],
			relative : true
		});
		
		if(options.dynamic){		
			$this.dynamic({
				bottom: {direction: 'down', bounce: true },
				left: {offset: [-10, 0], direction: 'left', bounce: true}
		  	});
        }
        
     });
  };
})( jQuery );
