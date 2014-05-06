angular.module("myo2Directives", ['compile'])
.directive('o2Title', [
	function() {
		return {
			restrict: 'AE',
			replace: true,
			template: '<h1 class="paragraph-title-{{size}}">{{text}}</h1>',
			scope: {
				text: '=text',
				size: '=size'
			}
		};
	}
	])
.directive('o2AmountEnlarged', [ 
	function() {
		return {
			restrict: 'AE',
			replace: true,
			template: '<span class="amount">{{value | currencyFormatter:!!poundValue}}</span>',
			scope: {
				value: '=value',
				poundValue: '=poundValue'
			}
		};
	}
	])
.directive('o2Percentage', [ 
	function() {
		return {
			restrict: 'AE',
			replace: true,
			template: '<span>{{value | percentageFormatter}}</span>',
			scope: {
				value: '=value'
			}
		};
	}
	])
.directive('o2Amount', [ 
	function() {
		return {
			restrict: 'AE',
			replace: true,
			template: '<span>{{value | currencyFormatter:!!poundValue}}</span>',
			scope: {
				value: '=value',
				poundValue: '=poundValue'
			}
		};
	}
	])
.directive('o2Date', [ 
	function() {
		return {
			restrict: 'AE',
			replace: true,
			template: '<time>{{value | dateFormatter}}</time>',
			scope: {
				value: '=value'
			}
		};
	}
	])
.directive('donutchart2', ['$timeout', '$compile', '$rootScope', function($timeout, $compile, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                percentage: '=percentage',
                isAboveThreshold: '=isabovethreshold',
                isUnlimited: '=isunlimited',
                lineWidth: '=linewidth',
                radius: '=radius'
            },
            link: function (scope, element, attrs) {
                var percentage = scope.percentage;
                if (scope.isUnlimited) {
                    percentage = 0;
                }
                if($rootScope.svgSupported){
                    var options = {
                        lineWidth:scope.lineWidth,
                        radius:scope.radius,
                        width:2*scope.radius+scope.lineWidth+4,
                        height:2*scope.radius+scope.lineWidth+4,
                        animate:1500,
                        barColor:'#C0C0C0',
                        trackColor: '#032b5a'
                    };
                    angular.extend(options, scope.options);

                    if (scope.isAboveThreshold) {
                        //change color to orange
                        options.trackColor = '#FF9900';
                    }

                    var donutChart = new DonutChart(element[0], options);
                    donutChart.draw(percentage);
                }else{
                    percentage = 100 - percentage.toFixed(0);

                    var mod = percentage % 5;
                    if(mod){
                        percentage = percentage + (5 - mod);
                    }
                    var donutsize = "big";
                    if(scope.radius<16){
                        donutsize = "small";
                    }
                    var donutcolor = "blue";
                    if(scope.isAboveThreshold){
                        donutcolor = "orange";
                    }
                    var newElement = $compile('<span class="donut_'+donutsize+'_'+donutcolor+' donut_'+donutsize+'_'+percentage+'" ></span>')(scope);
                    element.append(newElement);
                }
            }
        };
    }])

.directive('donutchart', ['$timeout', '$compile', '$rootScope', function($timeout, $compile, $rootScope) {
	return {
		restrict: 'AE',
			scope: {
				percentage: '=percentage',
				isAboveThreshold: '=isabovethreshold',
				isUnlimited: '=isunlimited',
				lineWidth: '=linewidth',
				radius: '=radius'
			},
			link: function (scope, element, attrs) {
				var percentage = scope.percentage;
				if (scope.isUnlimited) {
					percentage = 0;
				}
				if($rootScope.svgSupported){
					var options = {
						lineWidth:scope.lineWidth,
						radius:scope.radius,
						width:2*scope.radius+scope.lineWidth+4,
						height:2*scope.radius+scope.lineWidth+4,
						animate:1500,
						barColor:'#C0C0C0',
						trackColor: '#032b5a'
					};
					angular.extend(options, scope.options);

					if (scope.isAboveThreshold) {
						//change color to orange
						options.trackColor = '#FF9900';
					}

					var donutChart = new DonutChart(element[0], options);
					donutChart.draw(percentage);
				}else{
					percentage = 100 - percentage.toFixed(0);
					var mod = percentage % 5;
					if(mod){
						percentage = percentage + (5 - mod);
					}
					var donutsize = "big";
					/*if(scope.radius<16){
						donutsize = "small";
					}*/
					var donutcolor = "blue";
					if(scope.isAboveThreshold){
						donutcolor = "orange";
					}
					//var newElement = $compile('<span class="donut_'+donutsize+'_'+donutcolor+' donut_'+donutsize+'_'+percentage+'" ></span>')(scope);
					var newElement = $compile('<span class="donut_'+donutcolor+' donut_'+percentage+'" ></span>')(scope);
					element.append(newElement);
					/*donut_blue/orange
						donut_0
						donut_5
						donut_75
						donut_95
						.donut_100{image background, block}
					 + donut%*/
				}
			}
	};
}])
.directive('o2Tooltip', ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		scope:{
			tooltipWidth: "@tooltipWidth",
			tooltipRightOffset : "@tooltipRightOffset"
		},


		link: function (scope, element, attrs) {
			//Binding click to the image
			$(element).on("click",element.find("svg"),function(){
			//Wrapping jQLite element in jQuery
			jqElement=$(element);

			//Getting viewportwidth
			var viewport=$(window).width();

			//Creating markup for tooltip
			if ($rootScope.svgSupported) {
				var tooltipdiv = '<div class="tooltip"> <img class="tooltipclose" alt="X" src="' + defaultProperties.assetsURL+ 'img/default/white_cross.svg" /></div>';
			} else {
				var tooltipdiv = '<div class="tooltip"> <img class="tooltipclose" alt="X" src="' + defaultProperties.assetsURL+ 'img/default/white_cross.png" /></div>';
			}

			var tooltipWidth = scope.tooltipWidth || 204;
			var tooltipRightOffset = scope.tooltipRightOffset || 30;

			//Toggling function
			var toggleTooltip = function(){
				($(jqElement.find(".tooltip")[0])).fadeToggle(200);
			}

			// Function to create a new & insert a tooltip in DOM
			var createTooltip = function(){
				//Creating a tooltip to append in the DOM
				//Not working with jqLite
				var tempElement=$(tooltipdiv).css({'width':tooltipWidth,'display':'none'});

				//Getting icon position
				//Not working with jqLite                
				var iconLeftposition=jqElement.offset().left;
				var iconTopposition=jqElement.offset().top;

				//Computing tooltip position
				diff= viewport - iconLeftposition - 60;

				var desiredPosition = "place-to-right";

				if(diff < (tooltipWidth + tooltipRightOffset)){
					desiredPosition = "place-to-left" ;
				}

				var heading, content;

				if(attrs.o2Tooltip === 'dynamic') {
				    heading = attrs.o2TooltipHeading;
				    content = attrs.o2TooltipContent;
				} else {
                    heading = defaultProperties.constants[attrs.o2Tooltip].heading
                    content = defaultProperties.constants[attrs.o2Tooltip].text
				}

				//Adding position & text to tooltip
				tempElement.addClass(desiredPosition).append("<p class='tooltip-heading'>"+ heading +"</p><p class='tooltip-text'>" + content + "</p>");

				//Pushing tooltip to DOM
				jqElement.append(tempElement);
				
				// close button click
				$("img .tooltipclose").click(function(){
					if(jqElement.find(".tooltip").length > 0){
						$.each(jqElement.find(".tooltip"),function(index,value){
							$(value).remove();
						});
					}
				});

				//Toggling hidden tooltip
				toggleTooltip();

			}

			// To toggle tooltip
			if(jqElement.children('.tooltip').length > 0){
				toggleTooltip();
				jqElement.children('.tooltip').remove();
			}else{
				var existingTooltip = $("body .tooltip");
				if(existingTooltip.length > 0){
					$.each(existingTooltip , function(index,value){
						$(value).remove();
					});
				}
				createTooltip();
			}
		});
	}
}

}]).directive('o2Link', [function() {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			//disambiguation_id = 'disambiguation_id=' + scope.disambiguationId;
			prameterSeparater = "?";
			if(attrs.o2Link.indexOf("\?") > 0){
				prameterSeparater = "&";
			}
            element.attr('href', scope.defaultProperties.mymobileBaseUrl + attrs.o2Link );
		}
	};
}])
.directive('placeholder', function () {
    if (!angular.mock) {
      var test = document.createElement('input');
      if (test.placeholder !== void 0)
        return {};
    }
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
      	// Do not remove this timeout, without this it does not work in IE8
      		setTimeout(function(){
	      		jQ17.placeholder.shim();
      		}, 0);
    	}
	};
  })
.directive('o2HeightChangeSource', [
	function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope.$watch(function(){return element.height();}, function(nv, ov) {
					scope.allowancesDetailsContainerHeight = nv - 60;
				});
			}
		};
	}
])
.directive('o2HeightChangeTarget', [
	function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				if (!scope.initialHeight && element.height()) {
					scope.initialHeight = element.height();
				}
				scope.$watch('allowancesDetailsContainerHeight', function(nv, ov) {
					if (scope.allowancesDetailsContainerHeight > 134) {
						element.css('margin-top', ((scope.allowancesDetailsContainerHeight-scope.initialHeight)/2 - 30) + 'px');
					}
				});
			}
		};
	}
])
.directive('focusOn',['$timeout','$rootScope', function($timeout,$rootScope) {
    return {
        restrict: 'A',
        scope: {
            focusValue: "=focusOn"
        },
        link: function(scope, $element, attrs) {
            scope.$watch("focusValue", function(currentValue, previousValue) {
                if (currentValue === true) {
                    $element[0].focus();
                } else if (currentValue === false) {
                    $element[0].blur();
                }

                scope.focusValue = undefined;

            })
        }
    }
}])      
.directive('o2svg', ['$compile', '$rootScope', function($compile, $rootScope){
	return {
		restrict: 'AE',
		scope: {
			   name: '='
		},
		replace: true,
		link: function(scope, element, attr) {
			attr.tag= attr.tag || 'span';
			var attributes = "";
			var excludedAttributes = ["name", "fallbackext", "tag"];
			$.each(attr.$attr, function(key){

				if($.inArray(key, excludedAttributes) <= -1){

					if(key=="svgclass"){
						if($rootScope.svgSupported){
							attributes += " class='" + attr.svgclass + "'";
						}
					}else if(key=="nonsvgclass"){
						if(!$rootScope.svgSupported){
							attributes += " class='" + attr.nonsvgclass + "'";
						}
					}else{
						attributes += " " + key + "='" + attr[key] + "'";
					}

				}

			})

			if($rootScope.svgSupported){
				var imageName = scope.name + ".svg";
				var newElement = $compile('<'+attr.tag+' '+attributes+' ng-include="\''+imageName+'\'"></'+attr.tag+'>')(scope);
			} else {
				attr.fallbackext = attr.fallbackext || 'png';
				var imageName = properties.imagesURL +'/'+ scope.name + '.' + attr.fallbackext;
				var newElement = $compile('<'+attr.tag+' '+attributes+'><img src="'+imageName+'"/></'+attr.tag+'>')(scope);
			}
			element.replaceWith(newElement);
		}
	};
}])       
.directive('o2Overlay', ['$compile','$rootScope', '$http', '$templateCache',function($compile,$rootScope, $http, $templateCache){
	return{
		restrict:'A',
		link:function(scope,element,attrs){
			
			var overlayElement = null;
			//$compile is not working so not using o2svg directive
			if ($rootScope.svgSupported) {
				overlayElement = '  <div  style="display:none" id="o2Overlay" class="overlay-wrapper">	<div class="overlay-container">  <img id="closeOverlayIcon" class="overlay-close" alt="X" src="' + defaultProperties.assetsURL+ 'img/default/blue_cross.svg" />  <div class="overlay-content"></div> </div> </div>';
			} else {
				overlayElement = '  <div  style="display:none" id="o2Overlay" class="overlay-wrapper">	<div class="overlay-container">  <img id="closeOverlayIcon" class="overlay-close" alt="X" src="' + defaultProperties.assetsURL+ 'img/default/blue_cross.png" />  <div class="overlay-content"></div> </div> </div>';
			}
			
			var contentUrl = ASSET_URL + attrs.o2Overlay;
			if (defaultProperties.constants[attrs.o2Overlay]) {
				contentUrl = ASSET_URL + defaultProperties.constants[attrs.o2Overlay].contentUrl;
			};
			//Template to inject
			var content = "";
			var template = 	$templateCache.get(contentUrl);
			if(template==undefined){
			    $http.get(contentUrl)
                    .success(function(successResponse) {
                        content = $compile('<div>' + successResponse + '</div>')(scope);
                    })
                    .error(function(errorResponse) {
                        scope.template = 'error';
                    });
			}else{
			    content = $compile(template)(scope);
			}

			//Setting properties
			var overlayContainerMargin = attrs.overlayContainerMargin || 60;

			//Binding event 
			element.bind('click',function(){

				//Toggling function
				var toggleOverlayWrapper = function(){
					$('#o2Overlay').fadeToggle(150);
				}

				var getHiddenElementHeight = function(hiddenElement){

					$(hiddenElement).parent()
						.css({
							visibility : 'hidden',
							display : 'block'
						});

					optionHeight = $(hiddenElement).height();

					$(hiddenElement).parent()
						.css({
							visibility: '',
							display: 'none'
						});
					return optionHeight ;	
				}
				var toggleOverlay = function(){


					// //Adding content to overlay
					$('body #o2Overlay .overlay-content').html(content);

					setTimeout(function(){
					// Getting the height of overlay container
					var overlayContainer = $('body #o2Overlay .overlay-container');
					var overlayContainerContent = $('body #o2Overlay .overlay-container .overlay-content');
					var contentHeight = getHiddenElementHeight(overlayContainer);

					//Calc position for overlay container
					var calcTop = (document.documentElement.clientHeight - contentHeight -overlayContainerMargin)/2;

					var overlayContainerTop = (calcTop > overlayContainerMargin) ? calcTop : overlayContainerMargin;

					// Calc max-height for overlay container
					var overlayContainerMaxHeight =document.documentElement.clientHeight - 2*overlayContainerMargin -60; //60 is css applied padding
					
					//Applying calculated styles
					var overlayStyle = {
						'top':overlayContainerTop,
					    'max-height':overlayContainerMaxHeight
					};
					overlayContainer.css(overlayStyle);
					overlayContainer.addClass("o2overlayIE");
					overlayContainerContent.css('max-height',overlayContainerMaxHeight-20);
					//Finally toggling the overlay
					toggleOverlayWrapper();
				},50);
			}

				//Checking if overlay wrapper is already present
				//If not appending it to the body
				if($('body').find('#o2Overlay').length == 0){
					overlayElement = $(overlayElement);
					$((overlayElement).find('.overlay-close')[0]).bind('click',function(){toggleOverlayWrapper()});
					$('body').append(overlayElement);
				}
				toggleOverlay();
			})
		}
	}
}])
.directive('watermark', function($interval, dateFilter) {
	return function(scope, element, attrs) {
		var stopTime; // so that we can cancel the time updates
		function applyWaterMark() {
			if ($(element)) {
				$(element).watermark(attrs.watermark);
				$interval.cancel(stopTime);	
			};
		}
		stopTime = $interval(applyWaterMark, 250);
	}
})
.directive('o2LazyJs', function(){
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr) {
            elem.hide();
            var code = elem.text();
            var f = new Function(code);
            f();
        }
    };
})
.directive('masonryBrick', function ($compile) {
    return {
      restrict: 'AC',
      link: function (scope, elem, attrs) {
          elem.imagesLoaded(function () {
               var masonryContainer = angular.element(".masonry");
               /*Commented code below since it was giving initialization error*/
               /*try{
                masonryContainer.masonry('appended', elem, true);
               }catch(e){
                   setInterval(function(){},1000);
                   masonryContainer.masonry('resize');
               }*/
               if(angular.element(".masonry-brick").size() == 0){
                   $timeout(function(){
                        masonryContainer.masonry('resize');
                   });
               }
               masonryContainer.masonry();
          });
    }
  };
})
.controller('overlayController', ["$scope", function($scope) {
	$scope.overlaySwitch = false;
	$scope.showOverlay = function() {
		$scope.overlaySwitch = true;
	};
	$scope.hideOverlay = function() {
		$scope.overlaySwitch = false;
	};
}])
.directive('o2OverlayTarget', ["$rootScope", function($rootScope) {
	var getTempateString = function() {
		var imageExtension = $rootScope.svgSupported ? 'svg' : 'png';
		var containerCssClass = Modernizr.csstransforms ? "overlay-container-centered" : "overlay-container-centered-lame";
		return '<div ng-show="overlaySwitch" class="overlay-wrapper animate-show-hide"> \
					<div class="' + containerCssClass + '"> \
						<img ng-click="hideOverlay()" id="closeOverlayIcon" class="overlay-close" alt="X" src="' + defaultProperties.assetsURL+ 'img/default/blue_cross.' + imageExtension + '" /> \
						<div class="overlay-content" ng-transclude></div> \
					</div> \
				</div>';
	}

	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		template: getTempateString()
	};
}]);