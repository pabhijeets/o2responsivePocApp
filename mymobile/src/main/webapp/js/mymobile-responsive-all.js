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
			disambiguation_id = 'disambiguation_id=' + scope.disambiguationId;
			prameterSeparater = "?";
			if(attrs.o2Link.indexOf("\?") > 0){
				prameterSeparater = "&";
			}
            element.attr('href', scope.defaultProperties.mymobileBaseUrl + attrs.o2Link + prameterSeparater + disambiguation_id);
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
function groupBy(list, groupByKey){
  if (!list || !groupByKey || list.length == 0) {
        return list;
      };

      //invalid group by key
      if (!list[0][groupByKey]) return list;

      var grouped = {};

      for(var i=0; i< list.length; i++) {
          if(!grouped[list[i][groupByKey]]) {
              grouped[list[i][groupByKey]] = [];
          }
          grouped[list[i][groupByKey]].push(list[i])
      }
      return grouped;
}
function ieStyleApply(){/*ie8o2css3.js*/

/*simple table with alternate colring of tr*/
$(".ie8-table tr:nth-child(odd)").addClass("darkBoxGreyColor-bg");
$(".ie8-table tr:nth-child(even)").addClass("lightBoxGrey-bg");

$(".ie8-table .grid-row:nth-child(odd)").addClass("darkBoxGreyColor-bg");
$(".ie8-table .grid-row:nth-child(even)").addClass("lightBoxGrey-bg");


/*simple table with alternate colring of tr - REVERSED*/
$(".ie8-table-rev tr:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-rev tr:nth-child(odd)").addClass("lightBoxGrey-bg");

$(".ie8-table-rev .grid-row:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-rev .grid-row:nth-child(odd)").addClass("lightBoxGrey-bg");



/*complex table alternate coloring with ref to tbody*/


/*bottom border*/
$(".ie8-table-complex tbody:nth-child(even) tr").addClass("boxGreyColor-bg");/*#EFEFEF*/
$(".ie8-table-complex tbody:nth-child(odd) tr").addClass("greyColor-bg");/*#F8F8F8*/

$(".ie8-table-complex tbody:nth-child(odd) .category-details td").addClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(even) .category-details td").addClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(odd) tr:last-child td").removeClass("ie8-table-border-bottom");
$(".ie8-table-complex tbody:nth-child(even) tr:last-child td").removeClass("ie8-table-border-bottom");

$(".ie8-table-complex tbody:nth-child(even) .category-caption td:nth-child(even)").addClass("darkBoxGreyColor-bg");
$(".ie8-table-complex tbody:nth-child(even) .category-details td:nth-child(odd)").addClass("darkBoxGreyColor-bg");/*#E6E6E6*/
$(".ie8-table-complex tbody:nth-child(even) .category-details td:first-child").css("background","none").removeClass("ie8-table-border-bottom");

$(".ie8-table-complex tbody:nth-child(odd) .category-caption td:nth-child(even)").addClass("lightBoxGrey-bg");
$(".ie8-table-complex tbody:nth-child(odd) .category-details td:nth-child(odd)").addClass("lightBoxGrey-bg");/*#EEEEEE*/
$(".ie8-table-complex tbody:nth-child(odd) .category-details td:first-child").css("background","none").removeClass("ie8-table-border-bottom");


$("#top-up-hostory-with-topups tr:nth-child(odd)").addClass("lightBoxGrey-bg");
$("#top-up-hostory-with-topups tr:nth-child(even) td:nth-child(even)").addClass("boxGreyColor-bg");;
$("#top-up-hostory-with-topups tr:nth-child(odd) td:nth-child(even)").addClass("darkBoxGreyColor-bg");


};

var ieStyleInterval = setInterval(function(){ieApplyInterval();},3000);
function ieApplyInterval()
{
  if($(".grid-row:nth-child(even) , tr:nth-child(even)")) {
    ieStyleApply();
    //clearInterval(ieStyleInterval);    
  }
}
angular.module("myo2Filters", [])

.filter('dateFormatter', ["$filter", function($filter) {
	return function(input, shortYear) {
		if(shortYear) {      
			return input ? $filter('date')(input, "dd MMM ''''yy") : null;
		}
		else {      
			return input ? $filter('date')(input, "dd MMM yyyy") : null;
		}
	};
}])

.filter('currencyFormatter', ["$filter", function($filter) {
	return function(input, poundValue) {
		if (input == undefined || input == null) {
			return "\u00A30.00";
		}

		if(poundValue) {
			return "\u00A3" + $filter('number')(input, 2);
		}

		if (input >= 0) {
			return "\u00A3" + $filter('number')(input/100, 2);
		} else {
			return "-" + "\u00A3" + $filter('number')(-input/100, 2);
		}
	};
}])


.filter('boltonCurrencyFormatter', ["$filter", function($filter) {
	return function(input) {
		return input==0 ? 'Free':$filter('currencyFormatter')(input);
	};
}])

.filter('dataAllowanceFormatter', function() {
	return function(dataAllowance, roundDown, precision) {
		precision = precision || 2;
		var decimalAdjustment = Math.pow(10, precision);
		roundDown = roundDown || false;
		dataAllowance = dataAllowance || 0;

		var unit = "KB";
		if (dataAllowance >= 1024 && dataAllowance < 1048576) {
			dataAllowance /= 1024;
			unit = "MB";
		}
		else if (dataAllowance >= 1048576) {
			dataAllowance /= 1048576;
			unit = "GB";
		}

	//round-up (ceil) or round-down (floor)
	//need manipulate number of decimal places, as javascript can not do floor and ceil on floats
	dataAllowance *= decimalAdjustment; //shift decimal place to the right by 'precision' number of places
	dataAllowance = roundDown ? Math.floor(dataAllowance) : Math.ceil(dataAllowance);
	dataAllowance /= decimalAdjustment; //shift decimal place back
	return {allowanceValue: dataAllowance.toFixed(precision), allowanceUnit: unit};
};
})

.filter('minutesAllowanceFormatter', function() {
	return function(seconds) {
		seconds = seconds || 0;
		var minutes = Math.floor(seconds / 60);
		minutes = minutes.toFixed();
		var balanceSeconds = seconds % 60;
		return minutes + ":" + (balanceSeconds < 10 ? "0"+balanceSeconds : balanceSeconds);
	};
})

.filter('orderStatusFormatter', function() {
	return function(orderStatus) {
		return defaultProperties.widgets.common.myorders.orderStatus[orderStatus];
	};
})
.filter('percentageFormatter', function() {
  return function(value) {
    value = value || 0;
    return value.toFixed(2) + "%";
  };
})
.filter('encode', function() {
  return function(value) {
    value = encodeURIComponent(value);
    return value;
  };
})
.filter('stringifyduration', function() {
  return function(value) {
    if (value === 'MONTHLY') {
    	return ' a month';
    };
  };
});
properties = {
	"serviceEndpoints" : {
		"getUserDetails" : MYMOBILE_BASE_URL+"api/userdetails",
		"paym" : {
			"getAvailableBoltons" : MYMOBILE_BASE_URL+"api/paymonthly/boltons/getavailableboltons",
			"addBoltons" : MYMOBILE_BASE_URL+"api/paymonthly/boltons/addboltons",
			"getDataAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/data",
			"getMinutesAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/minutes",
			"getMessagesAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/messages",
			"getBoltonsSummary" : MYMOBILE_BASE_URL+"api/paymonthly/myboltonssummary",
			"getBillDetails" : MYMOBILE_BASE_URL+"api/paymonthly/mybilldetails",
			"getTariff" : MYMOBILE_BASE_URL+"api/paymonthly/mytariffandboltons/tariffsummary",
			"getCallingPlan" : MYMOBILE_BASE_URL+"api/paymonthly/mytariff/callingplan",
			"getRecentCharges" : MYMOBILE_BASE_URL+"api/paymonthly/recentcharges",
            "getUpgradeEligibility" : MYMOBILE_BASE_URL+"api/paym/upgradeeligibility",
            "getCCAPhonePlan" : MYMOBILE_BASE_URL+"api/paym/ccaphoneplan"
		},
		"payg" : {
			"getBalanceAndAllowance" : MYMOBILE_BASE_URL+"api/payandgo/balanceandallowance",
			"getBoltons" : MYMOBILE_BASE_URL+"api/payandgo/boltons",
            "getTariffDetails" : MYMOBILE_BASE_URL+"api/payandgo/tariffdetails"
		}
	},
	"thresholdBalance": 200,
	"errorMessage" : "This information is not available at the moment. Please try again later.",
    "headings" : {
        "home" : "My O2",
        "allowances" : "Allowances",
        "callingplan" : "Call and text charges",
        "adddataboltons" : "Add data Bolt Ons",
        "balanceInformation" : "Balance Information",
        "dataInformation" : "Data information",
        "paygcallingplan" : "Call and text charges",
        "upgradeoptions": "Upgrade options",
        "anniversarydateinfo" : "Anniversary date",
        "phoneplan" : "Phone Plan",
        "phoneplaninformation" : "Phone plan information"
    },

    "paygBalanceAndAllowanceWarningMessage" : {
		"simplicityNoAllowance" : {
			"zeroBalance" : "Your balance is zero. Top up to get your next monthly allowance.",
			"balanceLessThanThreshold" : "Your balance is running low. Top up to get your next monthly allowance."
		},
		"pendingRecharge" : "Your balance was too low to get your monthly allowance. Top up to get your allowance.",
		"simplicityPaidFor" : {
			"inArrears" : "Your anniversary date has passed. Your balance was too low, top up to cover the cost of your tariff next month.",
			"notInArrears" : "You need enough balance on <next-payment-date> to cover the cost of your tariff next month."
		},
		"active" : {
			"inArrears" : "Your anniversary date has passed. Top up to receive your monthly allowance today.",
			"notInArrears" : "Top up by your anniversary date to get your next monthly allowance."
		}
	},

    "image" : {
		"alertUrl" : "icon_alert",
		"warningUrl" : "icon_warning"
	},

	"templateURL": ASSET_URL + "templates/highend",
	"assetsURL": ASSET_URL,
	"imagesURL": ASSET_URL + 'img/highend',

	"mylatestbill" : {
		title : "Latest bill",
		iconType : "img",
		iconUrl: "icon_bill",
		callToAction : "open-close",
		nextBillMessage : {
			BILL_DATE_NOT_TODAY : "Your next <billType> will arrive in <span class=\"bold\"><b><daysToNextBill></b></span>, on <span class=\"bold\"><b><nextbillDate></b></span>.",
			BILL_DATE_TODAY : "Your next <billType> will arrive today."
		},
		noBillMessage : "Your latest <billType> amount will appear here once your first bill has been produced on <span class=\"bold\"><time id=\"firstBillDateValue\"><nextbillDate></time></span>.",
		inTreatmentBillMessage : {
			summary : "<div class=\"grid-row\"><o2svg svgclass='alert-icon-intreatment' nonsvgclass='alert-icon-intreatment' name=\"'icon_warning'\" fallbackext='png'></o2svg><span id=\"inTreatmentBillSummaryMessage\" class=\"alert-message-comment\">Have you paid your latest bill?</span></div>",
			detail : "If you haven't paid your bill, please do it now to keep using your phone. If you have already paid, thank you. Our records take a little while to update."
		}
	},

	"myrecentcharges" : {
		title : "Recent charges",
		iconType : "img",
		iconUrl: "icon_recentcharges",
		callToAction : "open-close"
	},

	"mytariff" : {
		title : "Tariff",
		iconType : "img",
		iconUrl: "icon_tariff",
		callToAction : "open-close"
	},

	"myboltons" : {
		title : "Bolt Ons",
		iconType : "img",
		iconUrl: "icon_boltons",
		callToAction : "open-close"
	},

	"callingplan" : {
		title : "Call and text charges",
		iconType : "img",
		iconUrl: "icon_callingplan",
		callToAction : "new-page",
		newPageRoute : "/callingplan"
	},

	"myphoneplan" : {
		title : "Phone Plan",
		iconType : "img",
		iconUrl: "icon_phoneplan",
		callToAction : "new-page",
		newPageRoute : "/phoneplan"
	},

	"myupgradeoptions" : {
		title : "Upgrade options",
		iconType : "img",
		iconUrl: "icon_upgrade",
		callToAction : "new-page",
		newPageRoute : "/upgradeoptions"
	},

	"paygmytariff" : {
		title : "Tariff",
		iconType : "img",
		iconUrl: "icon_tariff",
		callToAction : "open-close"
	},

	"paygbalanceandallowance" : {
		title : "Current balance",
		iconType : "img",
		iconUrl: "icon_allowances",
		callToAction : "open-close",
		openByDefault : true
	},

	"dataallowance" : {
		title : "UK Data",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no UK data allowance included with your tariff. You'll be charged at your standard rate for any data you use.",
		threshold : 80,
		warningMessage : {
			CAPPED : "You've almost used all your data allowance. Once it's all used up, you'll be unable to use any more data.",
			OVERAGE_WITH_BUNDLE : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at your standard rate.",
			WEB_DAILY : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
		},
		criticalMessage : {
			CAPPED : "You've used all of your data allowance.",
			OVERAGE_WITH_BUNDLE : "You've used all of your data allowance.  You'll be charged for data at your standard rate.",
			WEB_DAILY : "You've used all of your data allowance. You'll now be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
		}
	},

	"minutesallowance" : {
		title : "Minutes",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no minutes allowance included with your tariff. You'll be charged at your standard rate for any minutes you use.",
		threshold : 80,
		warningMessage : "You are getting close to your minutes allowance limit.",
		criticalMessage : "You have used all your minutes allowance."
	},

	"messagesallowance" : {
		title : "Messages",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no messages allowance included with your tariff. You'll be charged at your standard rate for any messages you send.",
		threshold : 80,
		warningMessage : "You are getting close to your messages allowance limit.",
		criticalMessage : "You have used all your messages allowance."
	},

	"allowanceslink" : {
		title : "Allowances",
		iconType : "img",
		iconUrl: "icon_allowances",
		callToAction : "new-page",
		newPageRoute : "/allowances"
	},

	"paygcallingplan" : {
		title : "Call and text charges",
		iconType : "img",
		iconUrl: "icon_callingplan",
		callToAction : "new-page",
		newPageRoute : "/paygcallingplan"
	},

	"paygboltons" : {
		title : "Bolt Ons",
		iconType : "img",
		iconUrl: "icon_boltons",
		callToAction : "open-close",
		allowanceText : {
			NOT_APPLICABLE : "N/A",
			PENDING_RECHARGE : "Top up to use this Bolt On.",
			BLACKBERRY_DATA_ROAMING_VALID : "You have <EU> of European and <ROW> of Rest of the World data left.",
			BLACKBERRY_DATA_ROAMING_INVALID : "Unable to display."
		},
		statusText : {
			PENDING_ADDITION_PERIODIC_PAYMENT_DUE : "To be added on anniversary date",
			PENDING_ADDITION : "To be added",
			PENDING_REMOVAL_PERIODIC_PAYMENT_DUE : "To be removed on anniversary date",
			PENDING_REMOVAL : "To be removed",
			PENDING_RECHARGE : "Pending recharge. Balance too low",
			ACTIVE : "Ready for you to use",
			UNKNOWN : "N/A"
		}
	},

    "upgradeEligibility" : {
        paid: {
            LEASING: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "Just take your current phone to an O2 shop or call us free from your mobile on 202 so we can send you an envelope to return it to us. Make sure it's sent back in good working condition to avoid any additional charges."
            ],
            HANDSET_SIMO: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            CCA : [
                "You can pay <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> now to pay off your Phone Plan and choose a new phone or you can wait until <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> for your free upgrade.",
                "To upgrade visit the upgrade shop."
            ],
            HANDSET_SIMO_STAFF: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "To upgrade now call us on 202 from your mobile."
            ],
            CCA_STAFF : [
                "You can pay <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> now to pay off your Phone Plan and choose a new phone or you can wait until <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> for your free upgrade.",
                "To upgrade now call us on 202 from your mobile."
            ]
        },

        free: {
            LEASING: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "Just take your current phone to an O2 shop or call us free from your mobile on 202 so we can send you an envelope to return it to us. Make sure it's sent back in good working condition to avoid any additional charges."
            ],
            HANDSET_SIMO: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            CCA : [
                "You can upgrade now. As an existing customer you'll always get our very best deals on a new phone and tariff.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            HANDSET_SIMO_STAFF: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "To upgrade now call us on 202 from your mobile."
            ],
            CCA_STAFF : [
                "You can upgrade now. As an existing customer you'll always get our very best deals on a new phone and tariff.",
                "To upgrade now call us on 202 from your mobile."
            ]
        },
        noUpgrade: {
            MBB: "Mobile broadband customers are not eligible for upgrades.",
            IS_IN_TREATMENT: "You've got an unpaid bill - you can pay this off here. Once that's been sorted, come back here and we'll check to see if you can upgrade then.",
            IS_SIM_SWAPPED: "Sorry, you can't upgrade at the moment as you've recently changed your sim card. For your security, we ask that you wait at least 24 hours before upgrading. Please try again later.",
            IS_ORDER_IN_PROGRESS: "We're sorting out your upgrade order. As soon as we're done, we'll update your tariff details and let you know when you can upgrade next.",
            DEFAULT: "We're having some problems with our systems. Try again later and we should be able to get your upgrade date.",
            TARIFF_DOES_NOT_SUPPORT_UPGRADE: "To discuss your upgrade options, please contact Customer Service from your mobile on 202 or 0844 809 0202.",
            IS_SERVICE_BARRED: "Sorry you can't upgrade at this time. For more information contact Customer Service on 0844 809 0202.",
            UPGRADE_ENTITLEMENT_SERVICE_UNAVAILABLE: "The Upgrade Entitlement service is not available to the requester."
        },
        NO_FREE_TODAY: "You are not eligible for free upgrade today.",
        NOT_ELIGIBLE: "You are not eligible for upgrade today."

    }

};
//The main myo2responsive angular application
angular.module("myo2", [
        'ngRoute',
        'ngSanitize',
        'payMonthlyTariffService',
        'userDetailsService',
        'myLatestBillDetailsService',
        'recentChargesService',
        'allowancesService',
        'myBoltonsService',
        'addBoltonsService',
        'upgradeEligibilityService',
        'myPhonePlanService',
        'widgetModule',
        'userDetailsModule',
        'callingPlanModule',
        'myAllowancesModule',
        'allowanceDetailsModule',
        'myLatestBillModule',
        'myRecentChargesModule',
        'myTariffDetailsModule',
        'myBoltonsModule',
        'navigationModule',
        'addDataBoltOnModule',
        'myTariffSummaryModule',
        'paygAccountSummaryService',
        'paygBoltonsService',
        'balanceAndAllowanceSummaryModule',
        'myCallingPlanSummaryModule',
        'myTariffSummaryModule',
        'boltonsSummaryModule',
        'upgradeEligibilityModule',
        'compile',
        'myPhonePlanModule'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: "templates/highend/mymobileindex1.html"
            });
    }
    ])

    .run(['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
        $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
            $anchorScroll();
        });
        $rootScope.location = $location;
        $rootScope.svgSupported = Modernizr.svg;
    }
    ])

    .controller("rootController", ["$rootScope", function($rootScope) {
        $rootScope.properties = properties;
//        $rootScope.setFullSiteCookie = function () {
//            document.cookie="o2-full-site=true;domain=.o2.co.uk;path=/";
//            window.location = $rootScope.desktopSiteRedirectUrl;
//        }
//
//        $rootScope.disambiguationId = getParameterByName('disambiguation_id');
    }
    ])

    .filter('dateFormatter', ["$filter", function($filter) {
        return function(input, shortYear) {
            if(shortYear) {
                return input ? $filter('date')(input, "dd MMM ''''yy") : null;
            }
            else {
                return input ? $filter('date')(input, "dd MMM yyyy") : null;
            }
        };
    }])

    .filter('currencyFormatter', ["$filter", function($filter) {
        return function(input, poundValue) {
            if (input == undefined || input == null) {
                return "\u00A30.00";
            }
            if(poundValue) {
                return "\u00A3" + $filter('number')(input, 2);
            }

            if (input >= 0) {
                return "\u00A3" + $filter('number')(input/100, 2);
            } else {
                return "-" + "\u00A3" + $filter('number')(-input/100, 2);
            }
        };
    }])


    .filter('boltonCurrencyFormatter', ["$filter", function($filter) {
        return function(input) {
            return input==0 ? 'Free':$filter('currencyFormatter')(input);
        };
    }])

    .filter('dataAllowanceFormatter', function() {
        return function(dataAllowance, roundDown, precision) {
            precision = precision || 2;
            var decimalAdjustment = Math.pow(10, precision);
            roundDown = roundDown || false;
            dataAllowance = dataAllowance || 0;

            var unit = "KB";
            if (dataAllowance >= 1024 && dataAllowance < 1048576) {
                dataAllowance /= 1024;
                unit = "MB";
            }
            else if (dataAllowance >= 1048576) {
                dataAllowance /= 1048576;
                unit = "GB";
            }

            //round-up (ceil) or round-down (floor)
            //need manipulate number of decimal places, as javascript can not do floor and ceil on floats
            dataAllowance *= decimalAdjustment; //shift decimal place to the right by 'precision' number of places
            dataAllowance = roundDown ? Math.floor(dataAllowance) : Math.ceil(dataAllowance);
            dataAllowance /= decimalAdjustment; //shift decimal place back
            return {allowanceValue: dataAllowance.toFixed(precision), allowanceUnit: unit};
        };
    })

    .filter('minutesAllowanceFormatter', function() {
        return function(seconds) {
            seconds = seconds || 0;
            var minutes = Math.floor(seconds / 60);
            minutes = minutes.toFixed();
            var balanceSeconds = seconds % 60;
            return minutes + ":" + (balanceSeconds < 10 ? "0"+balanceSeconds : balanceSeconds);
        };
    })

    .filter('percentageFormatter', function() {
        return function(value) {
            value = value || 0;
            return value.toFixed(2) + "%";
        };
    })

    .directive('donutchart', ['$timeout', '$compile', '$rootScope', function($timeout, $compile, $rootScope) {
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

    .directive('script', function(){
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, elem, attr) {
                if (attr.type === 'text/javascript-lazy') {
                    var code = elem.text();
                    var f = new Function(code);
                    f();
                }
            }
        };
    })

    .directive('o2svg', ['$compile', '$rootScope', function($compile, $rootScope){
        return {
            restrict: 'E',
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

                }else {
                    attr.fallbackext = attr.fallbackext || 'png';
                    var imageName = properties.imagesURL +'/'+ scope.name + '.' + attr.fallbackext;
                    var newElement = $compile('<'+attr.tag+' '+attributes+'><img src="'+imageName+'"></img></'+attr.tag+'>')(scope);

                }
                element.replaceWith(newElement);
            }
        };
    }])


    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location','$rootScope', function($q, $location, $rootScope) {
            return {
                'request': function (config) {
                    var disambiguation_id = $rootScope.disambiguationId;
                    if(disambiguation_id != null  && (config.url.indexOf("_assets") == -1) && (config.url.indexOf(".svg") == -1) ) {
                        config.url = config.url + '?disambiguation_id=' + disambiguation_id;
                    }
                    return config || $q.when(config);
                },

                'responseError' : function(rejection) {
                    if(rejection.status == 401) {
                        var redirectUrl =  rejection.headers('loginPageUrl');
                        if(redirectUrl == null) {
                            redirectUrl = "";
                        }
                        window.location.href = redirectUrl;
                    }
                    return $q.reject(rejection);
                }
            }
        }]);
    }]);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

angular.module("angularsupportedtest", []);
function Bolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.description = obj.description;
  this.monthlyFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.selected = false;
}

function Boltons(boltons) {
  this.boltonList = [];
  for (var count = 0; count < boltons.length; count++) {
      this.boltonList.push(new Bolton(boltons[count]));
  }
    this.error = boltons.error;
}
function MyBolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.status = getStatus(obj.status);
  this.boltOnFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.startDate = obj.startDate;
  this.endDate = obj.expiryDate;
  this.billingInterval = getBillingInterval(obj.billingInterval);
  this.description = obj.description;
}

function getStatus(status){
  if(status ==='ACTIVE'){
    return 'Active';
  }else if(status==='PENDING_ADDITION'){
    return 'Pending for addition';
  }else if(status==='PENDING_REMOVAL'){
    return 'Pending for removal';
  }else if(status === 'PENDING_MODIFICATION'){
    return 'Pending for modification';
  }else{
    return status;
  }
}

function getBillingInterval(interval){
  if(interval ==='MONTHLY'){
    return 'per month';
  }else if(interval==='ONE_OFF'){
    return 'one-off';
  }
}

function getTitle(boltons){
  if(!boltons.hasCoreOrPromotionalDataBolton || boltons.hasCoreDataBolton){
    return 'Data allowance Bolt On';
  } 
  else if(boltons.hasCoreOrPromotionalDataBolton && !boltons.hasCoreDataBolton){
    return 'Inclusive Bolt On';
  }
}

function MyBoltons(boltons) {
  this.myboltonList = [];
  this.myCoreOrPromotionalDataBoltonList = [];
  this.myDataBoltonList = [];
  this.dataBoltOnsCount=0;
  this.otherBoltOnsCount=0;
  this.reasonForPendingRemoval = false;


  for (var count = 0; count < boltons.length; count++) {
    if (boltons[count].category === 'CORE_DATA' || boltons[count].category === 'PROMOTIONAL') {
      if (boltons[count].category === 'CORE_DATA') {
        this.hasCoreDataBolton = true;
      }
      if (boltons[count].status == 'ACTIVE'){
        this.hasActiveCoreOrPromotionalDataBolton = true;
      }
      this.myCoreOrPromotionalDataBoltonList.push(new MyBolton(boltons[count]));

      this.hasCoreOrPromotionalDataBolton = true;
      this.dataBoltOnsCount++;
    }else if (boltons[count].category === 'DATA') {
      var dataBolton = new MyBolton(boltons[count]);
      this.myDataBoltonList.push(dataBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | dataBolton.reasonForPendingRemoval);
      this.dataBoltOnsCount++;
    }else {
      var myBolton = new MyBolton(boltons[count]);
      this.myboltonList.push(myBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | myBolton.reasonForPendingRemoval);
      this.otherBoltOnsCount++;
    }
  }

  this.error = boltons.error;
  this.collapsed = true;

  this.title = getTitle(this);

  if(this.myCoreOrPromotionalDataBoltonList.length == 2){
    var coreOrPromoBoltOns = this.myCoreOrPromotionalDataBoltonList;
    if(coreOrPromoBoltOns[0].category === 'CORE_DATA' && coreOrPromoBoltOns[1].category === 'CORE_DATA'
      && ((coreOrPromoBoltOns[0].status === 'Pending for addition' && coreOrPromoBoltOns[1].status === 'Pending for removal') ||
          (coreOrPromoBoltOns[1].status === 'Pending for removal' && coreOrPromoBoltOns[1].status === 'Pending for addition'))){
      this.hasSwappedCoreDataBoltOn = true;
    }
  }
}
function UpgradeEligibility(obj) {
    this.isEligibleToday = obj.eligibleToday;

    this.isFreeUpgradeToday = obj.freeUpgradeToday;

    this.freeUpgradeOption = obj.freeUpgradeOption;

    this.paidUpgradeOption = obj.paidUpgradeOption;

    this.tariffClassification = obj.tariffClassification;

    this.tariffFamily = obj.tariffFamily;

    this.eligibilityFailureReasons = obj.eligibilityFailureReasons;

    this.error = obj.error;

    this.isInTreatment = obj.inTreatment;

    this.isSimSwapped =  obj.simSwapped;

    this.isOrderInProgress = obj.orderInProgress;

    this.isServiceBarred = obj.serviceBarred;

    this.isTariffSupportsUpgrade = obj.tariffSupportsUpgrade;

    this.isUgradeEntitlementServiceNotAvailable = obj.upgradeEntitlementServiceNotAvailable;

    if(obj.tariffClassification && obj.tariffClassification=="MBB"){
        this.isMBBUser = true;
    }
    
}
function BillingAddressView($scope, obj) {
	if (obj.error) {
		this.status = 'error';
	} else {		
		this.houseNumber = obj.houseNumber;
		this.houseName = obj.houseName;
		this.line1 = obj.line1;
		this.line2 = obj.line2;
		this.town = obj.town;
		this.county = obj.county;
		this.postcode = obj.postcode;
		this.status = 'success';
	}
	return this;
}
function MyLatestBillDetail(obj, $filter, isCCA) {
  var getDateDifferenceInDays = function (fromDate, toDate) {
      return Math.round((toDate-fromDate)/(24*3600*1000));
  }

  this.error = obj.error;
  this.collapsed = true;

  this.nextBillDate = obj.nextBillDate;
  this.paymentDueDate = obj.paymentDueDate;
  this.billAmount = obj.billAmount ? obj.billAmount.valueInPence : null;
  this.currentBalance = obj.currentBalance ? obj.currentBalance.valueInPence : null;
  this.billDate = obj.billDate;
  this.inTreatment = obj.inTreatment;

  this.daysToNextBill = getDateDifferenceInDays(new Date().getTime(), this.nextBillDate);

  var daysToNextBillString = this.daysToNextBill + (Math.abs(this.daysToNextBill) > 1 ? " days" : " day");
  var nextBillDateString = $filter("dateFormatter")(this.nextBillDate);

  this.nextBillMessage = properties.mylatestbill
                          .nextBillMessage[this.daysToNextBill != 0 ? "BILL_DATE_NOT_TODAY" : "BILL_DATE_TODAY"]
                          .replace("<daysToNextBill>", daysToNextBillString)
                          .replace("<nextbillDate>", nextBillDateString)
                          .replace("<billType>", isCCA ? "airtime bill" : "bill");

  if (!this.paymentDueDate) {
    this.noBillMessage = properties.mylatestbill
                            .noBillMessage
                            .replace("<nextbillDate>", nextBillDateString)
                            .replace("<billType>", isCCA ? "airtime bill" : "bill");
  }

  if(this.inTreatment) {
      this.inTreatmentBillMessage = properties.mylatestbill.inTreatmentBillMessage;
  }
}
function MobileNumbers($scope, obj) {
	$scope.status = "success";
	if(!obj.error) {
		for (var i = 0; i < obj.length; i++) {
			this.push(obj[i].value);
		}
	}
}

//Make this model object an array
MobileNumbers.prototype = Object.create(Array.prototype, {});
function UpgradeOptionMessagesHelper($filter, isCCA) {

    this.constructMessagesForUpgradeType = function(upgradeEligibility, upgradeType) {
        var upgradeMessages = []
        var displayUpgradeShop = false;

        if(this.contains(upgradeEligibility.tariffClassification, 'leasing')) {
            upgradeMessages = properties.upgradeEligibility[upgradeType].LEASING
        } else if (isCCA) {
            if (this.contains(upgradeEligibility.tariffClassification, "staff") || this.contains(upgradeEligibility.tariffFamily, "staff")) {
                upgradeMessages = properties.upgradeEligibility[upgradeType].CCA_STAFF
            } else {
                displayUpgradeShop = true;
                upgradeMessages = properties.upgradeEligibility[upgradeType].CCA
            }
        } else {
            if (this.contains(upgradeEligibility.tariffClassification, "staff") || this.contains(upgradeEligibility.tariffFamily, "staff")) {
                upgradeMessages = properties.upgradeEligibility[upgradeType].HANDSET_SIMO_STAFF
            } else {
                displayUpgradeShop = true;
                upgradeMessages = properties.upgradeEligibility[upgradeType].HANDSET_SIMO
            }
        }
        return { messages: upgradeMessages, displayUpgradeShop: displayUpgradeShop};
    }

    this.constructMessages = function (upgradeEligibility) {
        if(upgradeEligibility.isEligibleToday) {
            if(upgradeEligibility.isFreeUpgradeToday) {
                return this.constructMessagesForUpgradeType(upgradeEligibility, "free");
            } else if (upgradeEligibility.paidUpgradeOption && upgradeEligibility.freeUpgradeOption) {
                return this.constructMessagesForUpgradeType(upgradeEligibility, "paid");
            } else {
                return { messages: [properties.upgradeEligibility.noUpgrade.DEFAULT], displayUpgradeShop: false};
            }
        } else {
            return this.constructMessageForNoUpgrade(upgradeEligibility);
        }
    }

    this.constructMessageForNoUpgrade=function(upgradeEligibility){

        var upgradeMessages = []
        var displayUpgradeShop = false;

        if(upgradeEligibility.tariffClassification == 'MBB'){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.MBB);
        }else if(upgradeEligibility.isInTreatment){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_IN_TREATMENT);
        }else if(upgradeEligibility.isSimSwapped){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_SIM_SWAPPED);
        }else if(upgradeEligibility.isOrderInProgress){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_ORDER_IN_PROGRESS);
        }else if(upgradeEligibility.freeUpgradeOption && upgradeEligibility.freeUpgradeOption.eligibilityTime == "FUTURE"){
            var upgradeDate = $filter("dateFormatter")(upgradeEligibility.freeUpgradeOption.eligibilityDate);
            var upgradeDateMessage = "You'll be able to upgrade on "+upgradeDate + ".";
            upgradeMessages.push(upgradeDateMessage);
        }else if(upgradeEligibility.isServiceBarred){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_SERVICE_BARRED);
        }else if(!upgradeEligibility.isTariffSupportsUpgrade){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.TARIFF_DOES_NOT_SUPPORT_UPGRADE);
        }else if(upgradeEligibility.isUgradeEntitlementServiceNotAvailable){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.UPGRADE_ENTITLEMENT_SERVICE_UNAVAILABLE);
        }else{
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.DEFAULT);
        }
        return { messages: upgradeMessages, displayUpgradeShop: displayUpgradeShop};
    }

    this.contains = function (source, searchText) {
        return  (source.toLowerCase().indexOf(searchText) != -1);
    }
}
function UserDetails(obj) {
  this.mobileNumber = obj.registeredMobileNumber ? obj.registeredMobileNumber.value : undefined;
  this.emailAddress = obj.emailAddress;
  this.accountId = obj.accountId;
  this.ismonthly = obj.monthlyUser;
  this.isCCA = obj.cca;
  this.error = obj.error;
}
var calculatePercentageUsed = function(unlimited, startingBalance, used) {
    if (unlimited || !startingBalance) {
        return 0;
    }
    else {
        used = used || 0;
        return (used / startingBalance * 100);
    }
}

var getAlertMessage = function(allowanceType, percentageUsed, dataAllowanceType) {
	var alertMessage = {};
	var prop = properties[allowanceType+'allowance'];
	if (percentageUsed >= prop.threshold && percentageUsed < 100) {
        alertMessage.type = "warning";
		alertMessage.text = allowanceType == 'data' ? prop.warningMessage[dataAllowanceType] : prop.warningMessage;
	}
	else if (percentageUsed >= 100) {
        alertMessage.type = "alert";
		alertMessage.text = allowanceType == 'data' ? prop.criticalMessage[dataAllowanceType] : prop.criticalMessage;
	}
	return alertMessage;
}

function Allowance(type, obj) {
	this.type = type;
	
	this.error = obj.error || false;
	if (type == "data") {
		this.isValid = false;
		if (obj.dataAllowanceType && obj.dataAllowanceType != 'OVERAGE_WITH_NO_BUNDLE') {
			this.isValid = true;
			this.dataAllowanceType = obj.dataAllowanceType;
			if (obj.allowance == -1 || 
				obj.dataAllowanceType == 'DATA_UNLIMITED' || 
				obj.dataAllowanceType == 'DAILY_TETHERING' || 
				obj.dataAllowanceType == 'MONTHLY_TETHERING') {
					this.isUnlimited = true;
			}
			else {
				var dataAllowanceType = obj.dataAllowanceType || 'UNKNOWN';
				this.isUnlimited = false;
				this.expiryDate = obj.expiryDate
				this.startingBalance = obj.allowance;
				this.used = obj.used;
				this.remaining = obj.remaining;
				this.percentageUsed = obj.percentageUsed;
				var alertMessage = getAlertMessage(type, this.percentageUsed, dataAllowanceType);
				this.messageType = alertMessage.type;
				this.warningMessage = alertMessage.text;
			}
		}
	}
	else if (type == "minutes") {
		this.expiryDate = obj.expiryDate;
		this.startingBalance = obj.startingBalance;
		this.description=obj.description;
		this.used = obj.used;
		this.remaining = obj.remaining;
		this.isUnlimited = obj.unlimited;
		this.percentageUsed = calculatePercentageUsed(this.isUnlimited, this.startingBalance, this.used);
		var alertMessage = getAlertMessage(type, this.percentageUsed)
		this.messageType = alertMessage.type;
		this.warningMessage = alertMessage.text;
	}else if(type == "messages"){
		this.expiryDate = obj.expiryDate;
		this.startingBalance = obj.startingBalance;
		this.description=obj.description;
		this.used = obj.used;
		this.remaining = obj.remaining;
		this.isUnlimited = obj.unlimited;
		this.percentageUsed = calculatePercentageUsed(this.isUnlimited, this.startingBalance, this.used);
		var alertMessage = getAlertMessage(type, this.percentageUsed)
		this.messageType = alertMessage.type;
		this.warningMessage = alertMessage.text;
	}
}
function TariffDetail(obj) {
	this.error = obj.error;

	if(obj.basicContract){
	this.accountNumber = obj.basicContract.accountNumber;
	this.endDate = obj.basicContract.endDate;
	this.minimumTermInMonths = obj.basicContract.minimumTermInMonths;
	this.tariffId = obj.basicContract.tariffId;
	this.tariffName = obj.basicContract.tariffName;
	this.startDate = obj.basicContract.startDate;
	this.monthlyFee = obj.basicContract.monthlyFee ? obj.basicContract.monthlyFee.valueInPence : undefined;
	this.tariffStartDate = obj.basicContract.tariffStartDate;
	this.description = obj.basicContract.description;
	this.tariffFamily = obj.basicContract.tariffFamily;
	this.BillingInterval = obj.basicContract.BillingInterval;
	this.leased = obj.basicContract.leased;
	this.mobileBroadBand = obj.basicContract.mobileBroadBand;
	this.hasCoreDataBolton = obj.hasCoreDataBolton;
	/*this.is4gcustomer = obj.4GCustomer*/	
	}
}

function BaseViewModel(obj) {
  console.log('I am walking ', obj);  
}

BaseViewModel.prototype.convert = function(){};
function Allowances() {
	var filterAllowances = function(allowances, summarise) {
		if (summarise && allowances.length > 0) {
			var filteredAllowances = [];
			filteredAllowances.push(allowances[0]);
			for (var i = 1; i < allowances.length; i++) {
				if (allowances[i].warningMessage) {
					filteredAllowances.push(allowances[i]);
				}
			}
			return filteredAllowances;
		}
		else {
			return allowances;
		}
	};

	this.allowances = {
		'data' : [],
		'minutes' : [],
		'messages' : []
	};

	this.dataStatus = "loading";
	this.minutesStatus = "loading";
	this.messagesStatus = "loading";

	this.addDataAllowance = function(dataAllowance) {
		this.dataStatus = dataAllowance.error ? "error" : "success";
		if (dataAllowance.isValid || dataAllowance.error) {
			this.allowances.data.push(dataAllowance);
		}
	}

	this.addMinutesAllowance = function(minutesAllowance) {
		this.minutesStatus = minutesAllowance.error ? "error" : "success";
		this.allowances.minutes.push(minutesAllowance);
	}

	this.addMessagesAllowance = function(messagesAllowance) {
		this.messagesStatus = messagesAllowance.error ? "error" : "success";
		this.allowances.messages.push(messagesAllowance);
	}

	this.getAllowances = function(type, summarise) {
		return filterAllowances(this.allowances[type], summarise);
	}

	this.hasAllowances = function(type) {
		return this.allowances[type].length > 0;
	}

	this.hasSomeAllowances = function() {
		return (this.allowances.data.length > 0 || this.allowances.minutes.length > 0 || this.allowances.messages.length > 0)
	}

	this.errorRetrievingBothMinuteAndMessageAllowances = function() {
	    if(this.allowances.minutes.length > 0 && this.allowances.minutes[0].error
	        && this.allowances.messages.length > 0 && this.allowances.messages[0].error)
	        return true;
	    return false;
    }
}
function MyRecentCharges(obj) {
  this.error = obj.error;
  this.collapsed = true;
    
  this.voiceCharge = obj.voiceCharge ? obj.voiceCharge.valueInPence : null;
  this.messageCharge = obj.messageCharge ? obj.messageCharge.valueInPence : null;
  this.dataCharge = obj.dataCharge ? obj.dataCharge.valueInPence : null;
  this.internationalCharge = obj.internationalCharge ? obj.internationalCharge.valueInPence : null;
  this.otherCharge = obj.otherCharge ? obj.otherCharge.valueInPence : null;
  this.directToBillCharge = obj.directToBillCharge ? obj.directToBillCharge.valueInPence : null;
  this.totalCharge = obj.totalCharge ? obj.totalCharge.valueInPence : null;
  this.userHasBeenBilledBefore = obj.userHasBeenBilledBefore ? obj.userHasBeenBilledBefore : null;
}
function MyPhonePlan($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.status = "success";
		if (obj.ccaInfoMessage) {
			$scope.showCallToAction = false;
			this.ccaInfoMessage = obj.ccaInfoMessage;
		} else {		
			this.phoneName = obj.phoneName
			this.startDate = obj.startDate
			this.installmentDate = obj.installmentDate
			this.ccaNumber = obj.ccaNumber
			this.totalCredit = obj.totalCredit
			this.apr = obj.apr
			this.duration = obj.duration
			this.settlementAmount = obj.settlementAmount
			this.installmentAmount = obj.installmentAmount
			this.pendingAmount = obj.pendingAmount
			this.paidToDate = obj.paidToDate
			$scope.showCallToAction = true;
		}
	}
}
function PaygBoltons(boltons) {
	this.dataBoltons = [];
	this.otherBoltons = [];
	this.dataBoltOnsCount = 0;
	this.otherBoltOnsCount = 0;
	this.dataAndOtherBoltons = [];
	this.dataAndOtherBoltonsCount = 0;
	for (var count = 0; count < boltons.length; count++) {
    	if (boltons[count].boltOnCategory == "WAP") {
      		this.dataBoltons.push(new PaygBolton(boltons[count]));
      		this.dataBoltOnsCount++;
    	} else {
      		this.otherBoltons.push(new PaygBolton(boltons[count]));
      		this.otherBoltOnsCount++;
    	}
    	this.dataAndOtherBoltons.push(new PaygBolton(boltons[count]));
    	this.dataAndOtherBoltonsCount++;
  	}
  	this.groupedDataAndOtherBoltons = groupBy(this.dataAndOtherBoltons, "categoryText");
  	
}


function PaygBolton(obj) {

	var getBillingInterval = function (billingInterval) {
		if(billingInterval == "MONTHLY") {
			return "per month";
		} else if(billingInterval == "ONE_OFF") {
			return "one-off";
		}
	};

	var getBoltOnStatus = function(status, hasPendingPeriodicPayment) {
		var statusKey = status
		if ((status == "PENDING_ADDITION" || status == "PENDING_REMOVAL") && hasPendingPeriodicPayment) {
			statusKey += "_PERIODIC_PAYMENT_DUE";
		}
		return properties.paygboltons.statusText[statusKey];
	};

	var getCost = function(billingInterval, monthlyCost, oneOffCost) {
		if (billingInterval == "MONTHLY") {
			return monthlyCost ? monthlyCost.valueInPence : null;
		} else if (billingInterval == "ONE_OFF") {
			return oneOffCost ? oneOffCost.valueInPence : null;
		}
	};

	var getAllowanceRemainingText = function(obj) {
		var allowanceText = properties.paygboltons.allowanceText.NOT_APPLICABLE;
		if (obj.status == 'ACTIVE') {
			if (obj.blackBerryRoamingBoltOn) {
				if (obj.europeRemainingAllowance && obj.restOfWorldRemainingAllowance) {
					allowanceText = properties.paygboltons.allowanceText.BLACKBERRY_DATA_ROAMING_VALID
										.replace('<EU>', obj.europeRemainingAllowance)
										.replace('<ROW>', obj.restOfWorldRemainingAllowance);
				}
				else
					allowanceText = properties.paygboltons.allowanceText.BLACKBERRY_DATA_ROAMING_INVALID;
			} else if (obj.allowanceText && !obj.allowanceText.match(/ERR/)) {
				allowanceText = obj.allowanceText;
			}
		} else if (obj.status == 'PENDING_RECHARGE') {
			allowanceText = properties.paygboltons.allowanceText.PENDING_RECHARGE;
		}
		return allowanceText;
	};

	this.name = obj.name;
	this.status = getBoltOnStatus(obj.status, obj.hasPendingPeriodicPayment);
	this.billingInterval = getBillingInterval(obj.billingInterval);
	this.description = obj.description;
	this.anniversaryDate = obj.anniversaryDate;
	this.boltOnFee = getCost(obj.billingInterval, obj.monthlyCost, obj.oneOffCost);
	this.allowanceRemainingText = getAllowanceRemainingText(obj);
	this.boltOnCategory = obj.boltOnCategory;
	var today = new Date();
	today.setHours(0,0,0,0);
	this.isExpiryDateIsPastDate = obj.endDate ? (obj.status == 'PENDING_REMOVAL' && today > obj.endDate) : false;
	this.categoryText = getDisplaybleCategoryText(obj.boltOnCategory);
	if(obj.hasSubscriberDataAllowanceAllowance == true && obj.blackBerryRoamingBoltOn == true){
		this.goingAbroad = {caption : "Going Abroad", url : "http://international.o2.co.uk/internationaltariffs/travelling_abroad"}
	}
	if(obj.holdConfigurablePostcode){
		this.manageAction = {caption : "Manage postcode", url : "payandgo/configurepostcode?boltOnId=" + obj.id};
	}else if(obj.holdConfigurablePhoneNumbers){
		this.manageAction = {caption : "Manage my numbers", url : "payandgo/configureo2numbers?boltOnId=" + obj.id};
	}else if(obj.boltOnCategory == "FAMILY"){
		this.manageAction = {caption : "Manage Family", url : "family"};
	}else if(obj.boltOnCategory == "INTFAV"){
		this.manageAction = {caption : "Manage my numbers", extUrl : "https://if.o2.co.uk/templates/LoginStep1.aspx"};
	}
	
	if(obj.billingInterval == "MONTHLY" && (obj.status == 'PENDING_RECHARGE' || obj.status == 'ACTIVE')){
		this.action = {caption : "Remove", url : "payandgo/mytariffandboltons/confirmremovebolton?boltOnId=" + obj.id};
	}
}

function getDisplaybleCategoryText(category) {
  var CategoryTextMap = {
    "GENERAL"	: "Additional Bolt Ons",
    "LANDLINES"	: "Additional Bolt Ons",
    "YOURO2NOS"	: "Additional Bolt Ons",
    "WAP"		: "Web",
    "BBROAM" 	: "BlackBerry",
    "BBBOLTON"	: "BlackBerry",
	"FAMILY"	: "Your Family",
	"INTL"		: "Calling abroad from the UK",
	"INTFAV"	: "Calling abroad from the UK",
	"HOME"		: "O2 Home",
	"MSG"		: "Messaging",
	"TRAVELOFF"	: "Using your phone abroad",
	"TRAVEL"	: "Using your phone abroad",
	"EUROPE"	: "Using your phone abroad" 
  }
  return CategoryTextMap[category] ? CategoryTextMap[category] : category; 
}
function MyTariffSummary(obj) {
	this.error = obj.error;
    this.tariffName = obj.currentTariff ? obj.currentTariff.tariffName : null;
    this.benefits = obj.currentTariff ? obj.currentTariff.benefits : null;
}
function BalanceAndAllowanceSummary(obj, $filter) {
	this.error = obj.error;
	this.accountBalance = obj.accountBalance ? obj.accountBalance.valueInPence : null;
	this.allowanceText = getAllowanceText(obj);
	this.anniversaryDate = obj.anniversaryDate;
	this.topupMessage = "";
	this.imageUrl = "";
	if (obj.currentTariff) {
		if (obj.currentTariff.simplicityNoAllowance) {
			if (this.accountBalance === 0) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityNoAllowance.zeroBalance;
				this.imageUrl = "alert";
			} else if (this.accountBalance <= properties.thresholdBalance) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityNoAllowance.balanceLessThanThreshold;
				this.imageUrl = "warning";
			}
		} else {
			if (obj.currentTariff.pendingRecharge) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.pendingRecharge;
				this.imageUrl = "alert";
			} else {
				if (obj.currentTariff.inArrears) {
					if (obj.currentTariff.simplicityPaidFor) {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityPaidFor.inArrears;
						this.imageUrl = "alert";
					} else if (obj.currentTariff.accountStatus == 'ACTIVE') {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.active.inArrears;
						this.imageUrl = "alert";
					}
				} else {
					if (obj.currentTariff.simplicityPaidFor) {
						var warningMessageText = properties.paygBalanceAndAllowanceWarningMessage.simplicityPaidFor.notInArrears;
						var nextPaymentDate = $filter('dateFormatter')(obj.currentTariff.nextPaymentDate);
						this.topupMessage = warningMessageText.replace("<next-payment-date>", nextPaymentDate);
					} else if (obj.currentTariff.accountStatus == 'ACTIVE') {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.active.notInArrears;
					}
				}
			}
		}
	}
}

function getAllowanceText(obj) {
	if (obj.allowanceText == null || obj.allowanceText == "ERROR" || obj.currentTariff.pendingRecharge
				|| (obj.currentTariff.inArrears && obj.currentTariff.simplicityPaidFor)) {
		return null;
	} else {
		return obj.allowanceText;
	}
}
angular.module("userDetailsService", [])
.service("userDetailsService", ['$http', function($http) {
	var userDetailsService = {};

	userDetailsService.getUserDetails = function(callback) {
		$http.get(properties.serviceEndpoints.getUserDetails).then(function(successResponse) {
			callback(successResponse.data);
		}, function(errorResponse) {
			callback({error: properties.errorMessage});
		});
	}

	userDetailsService.getMobileNumbers = function(callback) {
		$http.get(defaultProperties.serviceEndpoints.common.mobileNumbers)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	}

	userDetailsService.getBillingAddress = function(callback) {
		$http.get(defaultProperties.serviceEndpoints.common.billingAddress)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	}
	
	return userDetailsService;
}]);
angular.module("addBoltonsService", [])
.service("addBoltonsService", ['$http', function($http) {
  var addBoltonsService = {};
  addBoltonsService.getAvailableOneOffBoltons = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getAvailableBoltons)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  addBoltonsService.addBoltOns = function(selectedBoltOns, callback) {
    $http.post(properties.serviceEndpoints.paym.addBoltons, selectedBoltOns)
      .success(function(successResponse) {
        callback(successResponse);
      })
      .error(function(errorResponse) {
        callback({error: properties.errorMessage});
      });
  }

  return addBoltonsService;
}]);
angular.module("recentChargesService", [])
    .service("recentChargesService", ['$http', function($http) {
        var recentChargesService = {};

        recentChargesService.getRecentCharges = function(callback) {
            $http.get(properties.serviceEndpoints.paym.getRecentCharges)
                .success(function(successResponse) {
                    callback(successResponse);
                })
                .error(function(errorResponse) {
                    callback({error: properties.errorMessage});
                });
        }

        return recentChargesService;
}]);
angular.module("myLatestBillDetailsService", [])
.service("myLatestBillDetailsService", ['$http', function($http) {
  var myLatestBillDetailsService = {};

  myLatestBillDetailsService.getBillDetails = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getBillDetails)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }
  return myLatestBillDetailsService;
}]);
angular.module("payMonthlyTariffService", [])
.service("payMonthlyTariffService", ['$http', function($http) {
	var payMonthlyTariffService = {};

  payMonthlyTariffService.getTariffDetail = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getTariff)
    .success(function(successResponse) {
      callback(successResponse);
    }).error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  payMonthlyTariffService.getCallingPlan = function(callback) {
      $http.get(properties.serviceEndpoints.paym.getCallingPlan)
          .success(function(successResponse) {
              callback(successResponse);
          }).error(function(errorResponse) {
              callback({error: properties.errorMessage});
      });
  }

  return payMonthlyTariffService;
}]);
angular.module("upgradeEligibilityService", [])
.service("upgradeEligibilityService", ['$http', function($http) {
    var upgradeEligibilityService = {};

    upgradeEligibilityService.getUpgradeEligibility = function(callback) {
        $http.get(properties.serviceEndpoints.paym.getUpgradeEligibility)
        .success(function(successResponse) {
          callback(successResponse);
        })
        .error(function(errorResponse) {
          callback({error: properties.errorMessage});
        });
    }

    return upgradeEligibilityService;
}]);
var calculatePercentageUsed = function(unlimited, startingBalance, used) {
    if (unlimited || !startingBalance) {
        return 0;
    }
    else {
        used = used || 0;
        return (used / startingBalance * 100);
    }
}

angular.module("allowancesService", [])
    .service("allowancesService", ['$http', function($http) {
        var allowancesService = {};

        allowancesService.getDataAllowance = function(callback) {
            $http.get(properties.serviceEndpoints.paym.getDataAllowances)
                .success(function(successResponse) {
                    successResponse.dataAllowanceSummary = successResponse.dataAllowanceSummary || {};
                    successResponse.dataAllowanceSummary.dataAllowanceType = successResponse.dataAllowanceType;
                    callback(successResponse.dataAllowanceSummary);
                })
                .error(function(errorResponse) {
                    callback({error: true});
                });
        }

        allowancesService.getMinutesAllowance = function(callback) {
            $http.get(properties.serviceEndpoints.paym.getMinutesAllowances)
                .success(function(successResponse) {
                    callback(successResponse.allowanceDetails);
                })
                .error(function(errorResponse) {
                    callback({error: true});
                })
        }


        allowancesService.getMessagesAllowance = function(callback) {
            $http.get(properties.serviceEndpoints.paym.getMessagesAllowances)
                .success(function(successResponse) {
                    callback(successResponse.allowanceDetails);
                })
                .error(function(errorResponse) {
                    callback({error: true});
                })
        }
        return allowancesService;
}]);
angular.module("myPhonePlanService", [])
.service("myPhonePlanService", ['$http', function($http) {
    var myPhonePlanService = {};

    myPhonePlanService.getDetails = function(callback) {
        $http.get(properties.serviceEndpoints.paym.getCCAPhonePlan)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return myPhonePlanService;
}]);
angular.module("myBoltonsService", [])
.service("myBoltonsService", ['$http', function($http) {
  var myBoltonsService = {};

  myBoltonsService.getBoltonsSummary = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getBoltonsSummary)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return myBoltonsService;
}]);
/*This service has being used to retrieve balance & allowance, tariff and calling plan for payg users. */
angular.module("paygAccountSummaryService", [])
.service("paygAccountSummaryService", ['$http', function($http) {
  var paygAccountSummaryService = {};

  paygAccountSummaryService.getSummary = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getBalanceAndAllowance)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paygAccountSummaryService;
}]);
/*This service has being used to retrieve payg boltons for payg users. */
angular.module("paygBoltonsService", [])
.service("paygBoltonsService", ['$http', function($http) {
  var paygBoltonsService = {};

  paygBoltonsService.getBoltons = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getBoltons)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paygBoltonsService;
}]);
angular.module("myBoltonsModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/boltonsdetails',
            {
                controller: "myBoltonsController.getBoltonsSummary",
                templateUrl: "templates/highend/myboltonsdetails.html"
            }
        );
  }
])
.controller("myBoltonsController.getBoltonsSummary", ['$scope', 'myBoltonsService',
  function($scope, myBoltonsService) {
    myBoltonsService.getBoltonsSummary(function(response) {
      if(response.length != 0) {
        $scope.myBoltons = new MyBoltons(response);
        if ($scope.myBoltons.myCoreOrPromotionalDataBoltonList.length ==0 && $scope.myBoltons.myDataBoltonList.length == 0 && $scope.myBoltons.myboltonList.length == 0) {
          $scope.showCallToAction = false;
        } else {
          $scope.showCallToAction = true;
        };
      } else {
        $scope.showCallToAction = false;
      }
      if (response.error) {
        $scope.status = 'error'
      }
      else {
        $scope.status = 'success'
      }
    });
  }
]);
angular.module('compile', [])
.config(['$compileProvider', function($compileProvider) {
    $compileProvider.directive('compile', ['$compile', function($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    return scope.$eval(attrs.compile);
                },
                function(value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                }
            );
        };
    }]);
}]);
angular.module("myRecentChargesModule", [])
.controller("myRecentChargesController.getSummary", ['$scope', 'recentChargesService',
    function($scope, recentChargesService) {
        recentChargesService.getRecentCharges(function(response) {
			$scope.recentCharges = new MyRecentCharges(response);
	        if (response.error) {
	          $scope.status = 'error';
	        }
	        else {
	          $scope.status = 'success';
	          if ($scope.recentCharges.totalCharge != 0) {
	            $scope.showCallToAction = true;
	          }
	        }
        });
    }
]);
angular.module("upgradeEligibilityModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/upgradeoptions',
            {
                controller: "upgradeEligibilityController.getOptions",
                templateUrl: "templates/highend/upgradeoptiondetails.html"
            }
        );
  }
])

.controller("upgradeEligibilityController.getOptions", ['$scope', '$rootScope', '$filter', 'upgradeEligibilityService',
    function($scope, $rootScope, $filter, upgradeEligibilityService) {
        upgradeEligibilityService.getUpgradeEligibility(function(upgradeEligibility) {
            var upgradeEligibility = new UpgradeEligibility(upgradeEligibility);

            if (upgradeEligibility.error) {
              $scope.status = 'error';
            } else {
              $scope.status = 'success';
              $scope.showCallToAction = true;
              var upgradeEligibilityModel = new UpgradeOptionMessagesHelper($filter, $rootScope.userDetails.isCCA).constructMessages(upgradeEligibility)
              if(upgradeEligibilityModel.messages[0] === properties.upgradeEligibility.noUpgrade.DEFAULT) {
                $scope.showCallToAction = false;
              }
              if(upgradeEligibility.isMBBUser){
                $rootScope.isMBBUser = upgradeEligibility.isMBBUser;
              }
              $scope.upgradeEligibilityMessages = upgradeEligibilityModel.messages;
              $scope.displayUpgradeShop = upgradeEligibilityModel.displayUpgradeShop;
              $scope.freeUpgradeOption = upgradeEligibility.freeUpgradeOption;
              $scope.paidUpgradeOption = upgradeEligibility.paidUpgradeOption;
          }
        });
    }
])
angular.module("widgetModule", [])
.controller("widgetController.doNothing", function() {});
angular.module("allowanceDetailsModule", ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/allowances', {
				templateUrl: "templates/highend/allowances.html"
		});
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/dataInformation', {
	        templateUrl: "templates/highend/datainformation.html"
        });
    }])
	.controller("allowanceDetailsController.setInLocalScope", ['$scope', function($scope) {
		$scope.title = $scope.allowance.description;
		$scope.status = $scope.allowance.error ? "error" : "success";
		$scope.allowance = $scope.allowance;
	}])
	.controller("allowanceDetailsController.watchLoadingStatus", ['$scope', function($scope) {
		$scope.$watch('loading == 3', function(newVal, oldVal) {
			if ($scope.loading == 3) {
				$scope.status = 'success';
				$scope.showCallToAction = true;
			}
		});
	}]);
angular.module("myAllowancesModule", [])
.controller("myAllowancesController.getSummary", ['$scope', 'allowancesService', function($scope, allowancesService) {
    $scope.allowances = new Allowances();
    $scope.loading = 0;

    var addNonDataAllowance = function (allowances, allowance, type) {
        if (type == "minutes") {
            allowances.addMinutesAllowance(new Allowance(type, allowance));
        }
        else if (type == "messages") {
            allowances.addMessagesAllowance(new Allowance(type, allowance));
        }
    }

    var populateNonDataAllowances = function (allowanceResponse, allowanceType, allowances) {
        if(allowanceResponse.error) {
            addNonDataAllowance(allowances, allowanceResponse, allowanceType)
        } else {
            for (var i = 0; i < allowanceResponse.length; i++) {
                addNonDataAllowance(allowances, allowanceResponse[i], allowanceType)
            }
        }
    };

    //data
	allowancesService.getDataAllowance(function(response) {
        if(response) {
            $scope.allowances.addDataAllowance(new Allowance("data", response));
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.dataStatus != "error") {
			$scope.allowances.dataStatus = "success";
        }
    });


    //minutes
	allowancesService.getMinutesAllowance(function(response) {
        if(response) {
            populateNonDataAllowances(response, "minutes", $scope.allowances);
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.minutesStatus != "error")
			$scope.allowances.minutesStatus = "success";
  	});

    //messages
    allowancesService.getMessagesAllowance(function(response) {
        if(response) {
            populateNonDataAllowances(response, "messages", $scope.allowances);
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.messagesStatus != "error")
			$scope.allowances.messagesStatus = "success";
    });

}]);
angular.module("addDataBoltOnModule", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
            .when('/adddataboltons',
            {
                controller: "addDataBoltOn.getBoltOns",
                templateUrl: "templates/highend/adddataboltons.html"
            });

        }
    ])
    .controller("addDataBoltOn.getBoltOns", ["$scope", "$location", "$anchorScroll", "allowancesService", "addBoltonsService",
        function($scope, $location, $anchorScroll, allowancesService, addBoltonsService) {
        $scope.currentView = 'select';
        $scope.disableAddBoltonButton = true;
        var selectedBoltons = $scope.selectedBoltOns = [];
        $scope.totalOneOffCost = 0;
        $scope.loading = 0;
        $scope.boltonCompletionLoading = true;


        allowancesService.getDataAllowance(function(dataAllowance) {
            if(dataAllowance) {
                $scope.allowance = new Allowance("data", dataAllowance);
                $scope.status = $scope.allowance.error ? "error" : "success";
            }
            $scope.loading++
        });
        
        addBoltonsService.getAvailableOneOffBoltons(function(availableBoltons) {
            $scope.availableBoltons = new Boltons(availableBoltons);
            $scope.loading++;
        });

        $scope.goToAllowancesPage = function() {
            $location.path("/allowances");
            $anchorScroll();
        }

        $scope.boltonSelected = function(bolton) {
            if(bolton.selected) {
                $scope.totalOneOffCost = $scope.totalOneOffCost + bolton.monthlyFee;
                selectedBoltons.push(bolton.id)
            } else {
                $scope.totalOneOffCost = $scope.totalOneOffCost - bolton.monthlyFee;
                selectedBoltons.splice(selectedBoltons.indexOf(bolton.id),1)
            }
        }

        $scope.add = function() {
            $scope.currentView = 'confirm';

           $anchorScroll();
        }

        $scope.goToSelectionPage = function() {
            $scope.currentView = 'select';

           $anchorScroll();
        }

        $scope.confirm = function() {
            addBoltonsService.addBoltOns(selectedBoltons, function(addBoltOnsResult) {
                $scope.addBoltOnsResult = addBoltOnsResult;
                $scope.boltonCompletionLoading = false;
            });
            $scope.currentView = 'success';
            
           $anchorScroll();
        }
    }
    ]);

angular.module("myPhonePlanModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/phoneplan',
            {
                controller: "myPhonePlanController.getDetails",
                templateUrl: "templates/highend/myphoneplanpage.html"
            }
        );
	}
])
.controller("myPhonePlanController.getDetails", ['$scope', 'myPhonePlanService',
	function($scope, myPhonePlanService) {
		myPhonePlanService.getDetails(function(phonePlanResponse) {
			$scope.myPhonePlan = new MyPhonePlan($scope, phonePlanResponse);
		});
	}
]);
angular.module("myLatestBillModule", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/balanceInformation',
            {
                templateUrl: "templates/highend/balanceinformation.html"
            }
        );
}
    ])
  .controller("myLatestBillController.getSummary", ['$scope', '$rootScope', 'myLatestBillDetailsService', '$filter',
    function($scope, $rootScope, myLatestBillDetailsService, $filter) {
      myLatestBillDetailsService.getBillDetails(function(response) {
        $scope.myLatestBillDetail = new MyLatestBillDetail(response, $filter, $rootScope.userDetails.isCCA);
        if (response.error) {
          $scope.status = 'error';
        }
        else {
          $scope.status = 'success';
          if($rootScope.userDetails.isCCA) {
              $scope.title="Latest airtime bill"
          }
          if ($scope.myLatestBillDetail.paymentDueDate != null) {
            $scope.showCallToAction = true;
          }
          if ($scope.myLatestBillDetail.inTreatment) {
            $scope.additionalSummary = $scope.myLatestBillDetail.inTreatmentBillMessage.summary;
          }
        }
      });
    }
  ]);
angular.module("callingPlanModule", [])
.controller("callingPlanController.getCallingPlan", ["$scope", function($scope) {
	$scope.someValue = "someValue";
}]);
angular.module("myTariffDetailsModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    	.when('/callingplan',
    		{
      			controller: "myTariffAndBoltonsController.getCallingPlan",
      			templateUrl: "templates/highend/mycallingplan.html"
      		}
      	)
        .when('/tariffdetails',
            {
                controller: "myTariffAndBoltonsController.getTariffDetails",
                templateUrl: "templates/highend/mytariffdetails.html"
            }
        );
  }
])
.controller(
	"myTariffAndBoltonsController.getTariffDetails", ['$scope', 'payMonthlyTariffService',
		function($scope, payMonthlyTariffService) {
            payMonthlyTariffService.getTariffDetail(function(tariffDetail) {
                $scope.tariffDetail = new TariffDetail(tariffDetail);
                if (tariffDetail.error) {
                  $scope.status = 'error';
                }
                else {
                  $scope.status = 'success';
                  $scope.showCallToAction = true;
                }
            });
        }
	])
.controller(
	"myTariffAndBoltonsController.getCallingPlan", ['$scope', 'payMonthlyTariffService',
		function($scope, payMonthlyTariffService) {
            payMonthlyTariffService.getCallingPlan(function(callingPlan) {
                $scope.callingPlan = callingPlan;
                if (callingPlan.error) {
                  $scope.status = 'error';
                }
                else {
                  $scope.status = 'success';
                }
          });
		}
	]);
angular.module("userDetailsModule", [])
.controller("userDetailsController.getUserDetails", ['$scope', '$rootScope', 'userDetailsService', 
	function($scope, $rootScope, userDetailsService) {
		userDetailsService.getUserDetails(function(response) {
			$rootScope.userDetails = new UserDetails(response);
			$scope.app.pageLoading = false;
		});
	}
])
.controller("userDetailsController.getMobileNumbers", ['$scope', 'userDetailsService', 
	function($scope, userDetailsService) {
		userDetailsService.getMobileNumbers(function(response) {
			$scope.mobileNumbers = new MobileNumbers($scope, response);
		});
	}
])
.controller("userDetailsController.getBillingAddress", ['$scope', 'userDetailsService', 
	function($scope, userDetailsService) {
		$scope.billingAddressView = {status: 'loading'};
		userDetailsService.getBillingAddress(function(response) {
			$scope.billingAddressView = new BillingAddressView($scope, response);
		});
	}
]);

angular.module("navigationModule", [])
    .controller("navigationController", ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

        $rootScope.desktopSiteRedirectUrl = $scope.app.desktopSiteRedirectUrl +
                                                    "?disambiguation_id=" + $rootScope.disambiguationId;

        $scope.linkClass = function (pageRoute, level) {
            var currentRoute = $location.path().substring(1) || 'home';
            var cssClass = pageRoute === currentRoute ? 'selectedNavLink' : 'navLink';
            return cssClass + '-' + level;
        };

        $scope.getHeading = function() {
            var currentRoute = $location.path().substring(1) || 'home';
            return properties.headings[currentRoute];
        }
    }
    ]);
angular.module("boltonsSummaryModule", [])
.controller("boltonsController.getSummary", ['$scope', 'paygBoltonsService',
    function($scope, paygBoltonsService) {
        paygBoltonsService.getBoltons(function(response) {
            if (response.error) {
                $scope.status = 'error';
            } else {
                $scope.status = 'success';
                $scope.paygBoltons = new PaygBoltons(response);
                if(response.length != 0) {
                    $scope.showCallToAction = true;
                } else {
                    $scope.showCallToAction = false;
                }
            }
        });
    }
]);
angular.module("balanceAndAllowanceSummaryModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/anniversarydateinfo', {
        templateUrl: "templates/highend/payg/anniversarydateinfo.html"
    });
}])
.controller("balanceAndAllowanceSummaryController.getSummary", ['$scope', '$filter', 'paygAccountSummaryService',
    function($scope, $filter, paygAccountSummaryService) {
        paygAccountSummaryService.getSummary(function(response) {
        $scope.balanceAndAllowanceSummary = new BalanceAndAllowanceSummary(response, $filter);
      	 if (response.error) {
	          $scope.status = 'error';
	        }
	        else {
	          $scope.status = 'success';	      	 
	        }
        });
    }
]);
angular.module("myTariffSummaryModule", [])
.controller("myTariffSummaryController.getSummary", ['$scope', 'paygAccountSummaryService',
    function($scope, paygAccountSummaryService) {
        paygAccountSummaryService.getSummary(function(response) {
        $scope.tariffSummary = new MyTariffSummary(response);
	       if (response.error) {
	          $scope.status = 'error';
	        }
	        else {
	          $scope.status = 'success';	          
	          $scope.showCallToAction = true;
	      	}
        });
    }
]);
angular.module("myCallingPlanSummaryModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/paygcallingplan',
            {
                controller: "myCallingPlanSummaryController.getSummary",
                templateUrl: "templates/highend/mycallingplan.html"
            }
        );
  }
])
.controller("myCallingPlanSummaryController.getSummary", ['$scope', 'paygAccountSummaryService',
    function($scope, paygAccountSummaryService) {
        paygAccountSummaryService.getSummary(function(callingPlan) {
        $scope.callingPlan = callingPlan.currentTariff ? callingPlan.currentTariff.callingPlanDetails : null;
	       if (callingPlan.error) {
	          $scope.status = 'error';
	          $scope.showCallToAction = false;
	        }
	        else {
	          $scope.status = 'success';	          
	          $scope.showCallToAction = true;
	      	}
        });
    }
]);

showMore = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var $trigger = jQuery(e.currentTarget);
    var $menu = $trigger.closest('ul');
    $menu.show();
    $menu.children('li').show();
    $trigger.parent().hide();
};

showMoreSecondary = function(e) {
    e.preventDefault();
    e.stopPropagation();

    jQuery('.overflow-menu').css({'margin-left' : 0});

    var $overflowMenu = jQuery('.overflow-menu'),
        $trigger = jQuery(e.currentTarget),
        $menu = $trigger.children('ul'),
        $overflowItems = $overflowMenu.find('li a');

    $overflowItems.attr('tabIndex', 0);
    $trigger.addClass('is-hover');
    $menu.show();

    var overFlowMenuWidth = $overflowMenu.width(),
        buttonWidth = jQuery('#nav-secondary').find('.show-more').innerWidth() - 2;

    $overflowMenu.css({'margin-left' : - (overFlowMenuWidth) + buttonWidth + 'px'});
};

hideMoreSecondary = function(e) {

    e.preventDefault();
    e.stopPropagation();

    var $trigger = jQuery(e.currentTarget),
        $menu = $trigger.children('ul');

    $trigger.removeClass('is-hover');
    $menu.hide();
};

hideMoreSecondaryOnFocusOut = function() {

    window.setTimeout(function(){

        var $elementParent = jQuery(document.activeElement).parents();
        var $secondaryNavShowMore = jQuery("#nav-secondary").find('.show-more');

        if (! $elementParent.is('.show-more')) {
            $secondaryNavShowMore.trigger('mouseleave');
        }
    }, 50);
};

reloadPage = function(e) {
    document.location.href = e.currentTarget.href;
};

highlightCurrentPageInNav = function() {
    var thisurl = document.location.href,
        $allLinks = jQuery("#nav-secondary").find("a"),
        $matchingLinks = [];

    if(document.location.hash != "") {
        thisurl = thisurl.substring(0,thisurl.indexOf("#"));
    }
    thisurl = thisurl.substring(0,thisurl.indexOf("?"));

    for(var i=0; i<$allLinks.length; i++) {
        var navUrl = $allLinks[i].href.substring(0,$allLinks[i].href.indexOf("?"));
        if(navUrl == thisurl && $allLinks[i].innerHTML != "More") {
            $matchingLinks.push($allLinks[i]);
        }
    }

    $matchingLinks = jQuery($matchingLinks);
    if (thisurl.indexOf('errors/404') === -1) {


        if ($matchingLinks.size() > 0) {
            var $thisUrlInNav = $matchingLinks.last();
            if ($thisUrlInNav.size() > 0) {
                var $parentListItem = $thisUrlInNav.closest('li');
                var $parentList = $parentListItem.closest('ul');
                $parentListItem.addClass('is-active');
            }
        }
    }
};
defaultProperties = {
	"templateURL": ASSET_URL + "templates/default",
	"assetsURL": ASSET_URL,
	"mymobileBaseUrl": MYMOBILE_BASE_URL,
	errorMessage : "This information is not available at the moment. Please try again later.",
	customErrorMessage: {
		paperFreeBillingSetupError : "Sorry, we could not switch you to paper-free billing. Please try again later.",
		paperFreeBillingFetchError : "Your paper-free billing preference is not available at the moment. Please try again later.",
		viewpaymentdetails : "Your payment details are not available at the moment. Please try again later.",
		pinCreationFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		pinResetFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		pinChangeFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		changePaymentDetailsError : "Sorry, there was an error updating your payment details. Please try again later.",
		pinAttemptsExceeded: "You have incorrectly entered your PIN three times.",
		pinAttemptsExceeded_secondLine: "Your payment details are now locked, in order to proceed please logout and try again later.",
		offerDetailsError: "There was an error updating your offer preference. Please try again later."
	},
	serviceEndpoints : {
		"common" : {
			"phoneDetails" : MYMOBILE_BASE_URL + "api/default/phonedetails",
            "myOrders" : MYMOBILE_BASE_URL + "api/myorders",
			"mobileNumbers":MYMOBILE_BASE_URL + "api/userdetails/mobilenumbers",
			"billingAddress":MYMOBILE_BASE_URL + "api/userdetails/billingaddress",
			"offers" : MYMOBILE_BASE_URL + "api/offers"
		},
		"paym" : {
			"validatePin": MYMOBILE_BASE_URL + "api/paymonthly/validatepin",
			"paymentType": MYMOBILE_BASE_URL + "api/paymonthly/paymenttype",
			"paymentdetials": {
				"changepaymentdetails": {
					"creditcard": MYMOBILE_BASE_URL + "api/paymonthly/paymentdetails/creditcard/change",
					"directdebit": MYMOBILE_BASE_URL + "api/paymonthly/paymentdetails/directdebit/change"
				}
			},
			"getPaperFreeBilling": MYMOBILE_BASE_URL + "api/paymonthly/paperfreebilling",
			"setPaperFreeBilling": MYMOBILE_BASE_URL + "api/paymonthly/setuppaperfreebilling",
			"createPin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/create",
			"resetPin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/reset",
			"changePin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/change",
			"getpendingtariff":MYMOBILE_BASE_URL + "api/paymonthly/mypendingtariff",
			"getswappabletravelboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabletravelbolton",
			"getswappableboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabledataboltons",
            "getswappableo2travelboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabletravelbolton"

		},
		"payg" : {
	        "topuphistory" : MYMOBILE_BASE_URL + "api/payandgo/topup/history",
	        "rewards" : MYMOBILE_BASE_URL + "api/payandgo/rewards"
	    }
	},

	constants: {
		mylatestbill:{
			contentUrl : "templates/default/common/overlay.html"
		},
		billsummarydetails:{
			contentUrl : "_assets/templates/default/paym/paperfreebilloverlay.html"
		},
		dataallowance:{
			heading : "Data Allowance",
			text : "data alowances"
		},
		minuteallowance:{
			heading : "Minute Allowance",
			text : "Minutes allowances" 
		},
		phoneDetailsIMEI:{
			heading: "What is the IMEI number?",
			text: "The International Mobile Equipment Identifier is unique to your phone and will be useful to the police if your phone is ever lost or stolen."
		},
		phoneDetailsPUK:{
			heading: "What is the PUK number?",
			text: "The PUK is your Personal Unblocking Key. If you enter your PIN number incorrectly three times the phone will be blocked, but you can use this code to unlock it."
		}

	},

	widgets: {
		common:{
			phonedetails: {
				title: "Phone details",
				titleSize: "small",
				iconUrl: null,
				showBgImage:false
			},

            myorders: {
                title: "Recent orders",
                titleSize: "small",
                iconUrl: null,
                showBgImage:false,
                orderStatus: {
                    "IN_PROGRESS" : "In Progress",
                    "CANCELLED" : "Cancelled",
                    "COMPLETE" : "Complete"
                }
            },

            "offers": {
                title: "Offers just for you",
                titleSize: "small"
            }
		},
		paym: {
			mylatestbill: {
				title: "Latest bill",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_bill.png",
				showBgImage:true,
				iconClass: "mylatestbill-icon"
			},

			phoneplan : {
				title: "Phone Plan",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_phoneplan.png",
				iconClass: "phoneplan-icon"
			},
			
			changeCreditCardDetails: {
				title: "Enter your new credit card details",
				titleSize: "medium",
				showBgImage:false
			},
			
			viewpaymentdetails: {
				title: "Payment details",
				titleSize: "medium",
				iconUrl: "_assets/img/highend/icon_paymentdetails.png",
				showBgImage:true,
				iconClass: "paymentdetails-icon"
			},

			myrecentcharges: {
				title: "Recent charges",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_recentcharges.png",
				showBgImage:false,
				iconClass: "myrecentcharges-icon"
			},

			myallowances: {
				title: "Allowances",
				titleSize: "large",
				grouped : "stacked-first-unit",
				iconUrl: "_assets/img/highend/icon_allowances.png",
				showBgImage:false,
				iconClass: "myallowances-icon"
			},
			mytariff: {
				title: "Tariff",
				titleSize: "medium",
				hideIcon: true,
				iconUrl: null
			},

			myboltons: {
				title: "Bolt Ons",
				titleSize: "medium",
				grouped : "stacked-last-unit",
				hideIcon: true,
				iconUrl: null
			},

			myupgradeoptions: {
				title: "Upgrade options",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_upgrade.png",
				showBgImage:true,
				iconClass: "myupgradeoptions-icon"
			},

			billsummarydetails: {
				titleSize: "medium"
			},

			tariffsummarydetails: {
				title: "Tariff",
				titleSize: "medium"
			},
			pendingtariffsection: {
				title: "Your new tariff",
				titleSize: "medium"
			},

			pendingtariffsummarydetails: {
				title: "Tariff",
				titleSize: "medium"
			},

			pendingtariffboltons: {
				title: "Including these additional Bolt Ons",
				titleSize: "small"
			},

			tariffdetails: {
				title: "Tariff details",
				titleSize: "small"
			},

			coreorpromoboltonsummarydetails: {
				title: "Data allowance Bolt On",
				titleSize: "small"
			},

			dataallowance : {
				title : "UK data",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no UK data allowance included with your tariff. You'll be charged at your standard rate for any data you use.",
				threshold : 80,
				warningMessage : {
					CAPPED : "You've almost used all your data allowance. Once it's all used up, you'll be unable to use any more data.",
					OVERAGE_WITH_BUNDLE : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at your standard rate for any data you use.",
					WEB_DAILY : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
				},
				criticalMessage : {
					CAPPED : "You've used all of your data allowance. Add a data Bolt On to continue using data.",
					OVERAGE_WITH_BUNDLE : "You've used all of your data allowance. You'll be charged for data at your standard rate for any data you use.",
					WEB_DAILY : "You've used all of your data allowance. You'll now be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
				}
			},

			minutesallowance : {
				title : "Minutes",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no minutes allowance included with your tariff. You'll be charged at your standard rate for any minutes you use.",
				threshold : 80,
				warningMessage : "You are getting close to your minutes allowance limit.",
				criticalMessage : "You have used all your minutes allowance."
			},

			messagesallowance : {
				title : "Messages",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no messages allowance included with your tariff. You'll be charged at your standard rate for any messages you send.",
				threshold : 80,
				warningMessage : "You are getting close to your messages allowance limit.",
				criticalMessage : "You have used all your messages allowance."
			},

			allowanceslink : {
				title : "Allowances",
				iconType : "img",
				iconUrl: ASSET_URL + "img/highend/icon_allowances.png",
				callToAction : "new-page",
				newPageRoute : "/allowances",
				widgetText : "Tarrif, Bolt Ons and Calling Plan"
			},

			billingaddress: {
				title: "Billing addresses",
				titleSize: "medium"
			}
		},

		payg: {
			"paygtariff" : {
				title : "Tariff",
				titleSize : "large",
				iconType : "img",
				iconUrl: ASSET_URL + "img/default/icon_tariff.png",
				callToAction : "new-page",
				newPageRoute : "/tariff",
				widgetText : "Tariff",
				iconClass: "payg-icon"
			},
            "balanceandallowance": {
                title : "Current balance",
                titleSize : "large",
                iconType : "img",
                iconUrl: ASSET_URL + "img/highend/icon_allowances.png",
                showBgImage:true,
                iconClass: "payg-icon-balance-allowance"

            },
            "boltons" : {
                title : "Bolt Ons",
                titleSize : "large",
                iconType : "img",
                iconUrl: ASSET_URL + "img/highend/icon_boltons.png",
                iconClass: "payg-icon-boltons"
             },
             "rewards" : {
                title : "My O2 Rewards",
                titleSize : "small",
                callToAction : "new-page",
                newPageRoute : "/tariff",
                signupLink : "http://payandgorewards.o2.co.uk/",
                o2rewardsLink : "http://payandgorewards.o2.co.uk/"
             },
            "tariffdetails" : {
                title : "Tariff",
                titleSize : "medium",
                status: {
                    "ACTIVE": 'Active',
                    "PENDING_RECHARGE": 'Awaiting top up',
                    "PENDING_REMOVAL": {
                        "nextPaymentDateInPast" : "To be removed",
                        "nextPaymentDateNotInPast" : "To be removed on anniversary date"
                    },
                    "OTHER": "N/A"
                }
            },
            "boltonsdetail" : {
				title: "Your additional Bolt Ons",
				titleSize: "medium"
			},
			"callingplan" : {
                title: "Calling plan",
                titleSize: "small"
            }
		}
	},
	phoneDetailsMessage : {
		gprsAndMMSSupported : "Your mobile device is capable of having mobile internet (GPRS WAP) and picture messaging (MMS).",
		onlyGPRSSupported: "Your mobile device is capable of having mobile internet (GPRS WAP).",
		onlyMMSSupported: "Your mobile device is capable of having picture messaging (MMS).",
		gprsAndMMSNotSupported: "Your mobile device is not capable of having mobile internet(GPRS WAP) and picture messaging. Please contact Customer Service for help with this."
	}
}
function MyRecentOrders($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.orders = obj.current;
	}
}
function Offers($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
    }else{
	$scope.status = "success";
	}
	this.offers = obj;
};

function OfferPreference(selectedOfferId, selectedAction) {
	this.selectedOfferId = selectedOfferId;
	this.selectedAction = selectedAction;
}
function PhoneDetails($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.brand = obj.brand;
		this.model = obj.model;
		this.imei = obj.imei;
		this.pukCode = obj.pukCode;
		this.gprsAndMMSSupportMessage = gprsAndMMSSupportMessage(obj);
	}

	function gprsAndMMSSupportMessage(obj) {
		var message;
		if(obj.gprsSupported && obj.mmsSupported) {
			 message = defaultProperties.phoneDetailsMessage.gprsAndMMSSupported;
		} else if (obj.gprsSupported) {
			message = defaultProperties.phoneDetailsMessage.onlyGPRSSupported;
		} else if (obj.mmsSupported) {
			message = defaultProperties.phoneDetailsMessage.onlyMMSSupported;
		} else {
			message = defaultProperties.phoneDetailsMessage.gprsAndMMSNotSupported;
		}
		return message;
	}
}
function PaymBolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.status = getStatus(obj.status);
  this.boltOnFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.startDate = obj.startDate;
  this.endDate = obj.expiryDate;
  this.billingInterval = getBillingInterval(obj.billingInterval);
  this.description = obj.description;
  this.category = obj.category;
  this.displayCategory = getPayMDisplaybleCategoryText(obj.category);
  this.reasonForPendingRemoval = showReasonForPendingRemoval(obj.expiryDate, this.status);
  this.internationalFavourite = obj.internationalFavourite;
  this.tugo = obj.tugo;
  this.action = getBoltonAction(obj);
  this.cancelToken = obj.cancelToken;
  this.immediate = obj.immediate;
  this.exclusiveGroups = obj.exclusiveGroups;
}

function getBoltonAction(obj) {
    if(obj.family) {
        return {caption: 'Manage', url: 'family'};
    } else if(obj.status ==='ACTIVE' && obj.o2Travel) {
        return {caption: 'Swap', url: ''};
    } else if(isRemovableBolton(obj)) {
        return {caption: 'Remove', url: 'paymonthly/mytariffandboltons/removebolton?boltonIdToRemove=' + obj.id};
    } else if(obj.status === 'PENDING_ADDITION' && obj.cancelToken != null && !obj.immediate && !obj.o2WebDaily) {
        return {caption: 'Cancel', url: 'paymonthly/mytariffandboltons/cancelboltonchange?boltonIdToCancel=' + obj.id};
    } else {
        return null;
    }
}

function isRemovableBolton(obj) {
    return obj.status === "ACTIVE"
            && obj['default'] === false
            && (obj.classification !== 'Family Subscription')
            && (obj.classification !== 'Family Discount')
            && (obj.classification !== 'Bar')
            && (obj.classification !== 'Billing Option')
            && (obj.classification !== 'Insurance')
            && (obj.classification !== 'Supplementary Service')
            && (obj.classification !== 'Subscription Discount')
            && (obj.monthlyFee ? obj.monthlyFee.valueInPence !== 0 : false)
            && obj.oneOff === false
            && obj.tugo === false;
}

function getPayMDisplaybleCategoryText(category) {
  var CategoryTextMap = {
    "ADDITIONAL": "Additional Bolt Ons",
    "CALLING_ABROAD": "Calling abroad from the UK",
    "CALLING_FROM_ABROAD": "Calling when abroad",
    "CALLING_IN_EUROPE": "Calling when in Europe",
    "DATA": "Data",
    "DATA_ABROAD": "Using your phone abroad",
    "CORE_DATA": "Data Allowance",
    "SUPPORT": "Support",
    "MESSAGING": "Messaging",
    "PROMOTIONAL": "Promotional",
    "YOUR_FAMILY": "Your Family"
  }
  return CategoryTextMap[category] ? CategoryTextMap[category] : category;
}

function showReasonForPendingRemoval(expiryDate, status){
  if('Pending for removal' === status) {
    var today = new Date();
    today.setHours(0,0,0,0);
    var expiry =  new Date(expiryDate);
    return expiryDate ? (expiry < today) : false;
  }
  return false;
}

function getStatus(status){
  if(status ==='ACTIVE'){
    return 'Active';
  }else if(status==='PENDING_ADDITION'){
    return 'Pending for addition';
  }else if(status==='PENDING_REMOVAL'){
    return 'Pending for removal';
  }else if(status === 'PENDING_MODIFICATION'){
    return 'Pending for modification';
  }else{
    return status;
  }
}

function getIsMutexWithAnyPendingAdditionBoltOn(boltonListToProcess, otherBoltonList) {
  var allBoltonsList = merge(boltonListToProcess, otherBoltonList);
  each(boltonListToProcess, function(currentBolton) {
    if (currentBolton.status === 'Pending for removal' && currentBolton.cancelToken != null && !currentBolton.immediate) {
      currentBolton.action = {
        caption: 'Cancel',
        url: 'paymonthly/mytariffandboltons/cancelboltonchange?boltonIdToCancel=' + currentBolton.id
      }
      each(currentBolton['exclusiveGroups'], function(exclusiveGroup1) {
        each(allBoltonsList, function(otherBolton) {
          each(otherBolton['exclusiveGroups'], function(exclusiveGroup2) {
            if (currentBolton.id != otherBolton.id && exclusiveGroup1 === exclusiveGroup2) {
              if (!otherBolton.o2WebDaily && otherBolton.status === 'Pending for addition') {
                currentBolton.action = null;
              }
            }
          });
        });
      });
    }
  });
}

function PaymBoltons(boltons) {
  this.myboltonList = [];
  this.myCoreOrPromotionalDataBoltonList = [];
  this.myDataBoltonList = [];
  this.dataBoltOnsCount=0;
  this.otherBoltOnsCount=0;
  this.reasonForPendingRemoval = false;
  this.groupedMyBoltonList = [];
  this.groupedMyDataBoltonList = [];

  for (var count = 0; count < boltons.length; count++) {
    if (boltons[count].category === 'CORE_DATA' || boltons[count].category === 'PROMOTIONAL') {
      if (boltons[count].category === 'CORE_DATA') {
        this.hasCoreDataBolton = true;
      }
      if (boltons[count].status == 'ACTIVE'){
        this.hasActiveCoreOrPromotionalDataBolton = true;
      }
      this.myCoreOrPromotionalDataBoltonList.push(new PaymBolton(boltons[count]));

      this.hasCoreOrPromotionalDataBolton = true;
      this.dataBoltOnsCount++;
    }else if (boltons[count].category === 'DATA') {
      var dataBolton = new PaymBolton(boltons[count]);
      this.myDataBoltonList.push(dataBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | dataBolton.reasonForPendingRemoval);
      this.dataBoltOnsCount++;
    }else {
      var myBolton = new PaymBolton(boltons[count]);
      this.myboltonList.push(myBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | myBolton.reasonForPendingRemoval);
      this.otherBoltOnsCount++;
    }
  }


  this.error = boltons.error;
  this.collapsed = true;

  this.title = getTitle(this);

  if(this.myCoreOrPromotionalDataBoltonList.length == 2){
    var coreOrPromoBoltOns = this.myCoreOrPromotionalDataBoltonList;
    if(coreOrPromoBoltOns[0].category === 'CORE_DATA' && coreOrPromoBoltOns[1].category === 'CORE_DATA'
      && ((coreOrPromoBoltOns[0].status === 'Pending for addition' && coreOrPromoBoltOns[1].status === 'Pending for removal') ||
          (coreOrPromoBoltOns[1].status === 'Pending for removal' && coreOrPromoBoltOns[1].status === 'Pending for addition'))){
      this.hasSwappedCoreDataBoltOn = true;
    }
  }

  //for core or promotional boltons add cancel action
  getIsMutexWithAnyPendingAdditionBoltOn(this.myCoreOrPromotionalDataBoltonList, this.myboltonList);
  //for core or additional boltons add cancel action
  getIsMutexWithAnyPendingAdditionBoltOn(this.myboltonList, this.myCoreOrPromotionalDataBoltonList);

  this.allBoltonsList = [];
  this.myDataBoltonAndOtherBoltonsList = [];
  for (var i = 0; i < this.myCoreOrPromotionalDataBoltonList.length; i++) {
    this.allBoltonsList.push(this.myCoreOrPromotionalDataBoltonList[i]);
  };
  for (var i = 0; i < this.myDataBoltonList.length; i++) {
    this.allBoltonsList.push(this.myDataBoltonList[i]);
    this.myDataBoltonAndOtherBoltonsList.push(this.myDataBoltonList[i]);
  };
  for (var i = 0; i < this.myboltonList.length; i++) {
    this.allBoltonsList.push(this.myboltonList[i]);
    this.myDataBoltonAndOtherBoltonsList.push(this.myboltonList[i]);
  };

  this.groupedMyBoltonList = groupBy(this.myboltonList, "category");
  this.groupedMyDataBoltonList = groupBy(this.myDataBoltonList, "category");
}
function DirectDebit() {
	//Input fields
	this.form = new Object();
	this.form.accountNumber;
    this.form.sortCodeFirstPart;
    this.form.sortCodeSecondPart;
    this.form.sortCodeThirdPart;
    this.form.pin;


    //flags to toggle error messages and button
	this.accountNumberFormatValid = true;
	this.sortCodeValid = true;
	this.pinValid = true;
	this.invalidAccountNumber = false;
	this.saveDisabled = false;

    this.validateDirectDebitForm = function() {

    	this.pinError = undefined;

		//Account number validations
		var accountNumberPattern = /^[0-9]{8,9}$/;
		this.accountNumberFormatValid = accountNumberPattern.test(this.form.accountNumber);

		//Sort code validations
		var sortCodePattern = /^[0-9]{2}$/;
		this.sortCodeValid = sortCodePattern.test(this.form.sortCodeFirstPart) && sortCodePattern.test(this.form.sortCodeSecondPart) && sortCodePattern.test(this.form.sortCodeThirdPart);

		//Pin validations
		var pinPattern = /^[0-9]{4}$/;
		this.pinValid = pinPattern.test(this.form.pin);
		
		this.saveDisabled = !(this.accountNumberFormatValid && this.sortCodeValid && this.pinValid);

		//set focus on correct field

		this.setFocusOnAccountNumber = !this.accountNumberFormatValid;
		this.setFocusOnSortCode = !this.setFocusOnAccountNumber && !this.sortCodeValid;
		this.setFocusOnPin = !this.setFocusOnAccountNumber && !this.setFocusOnSortCode && !this.pinValid;
	}

	this.handleSortCodeFocusForFirstField = function(){
		if(this.form.sortCodeFirstPart.length == 2){
			this.setFocusOnSecondSortCode = true;
			this.setFocusOnThirdSortCode = false;
		}
	}

	this.handleSortCodeFocusForSecondField = function(){
		if(this.form.sortCodeSecondPart.length == 2){
			this.setFocusOnSecondSortCode = false;
			this.setFocusOnThirdSortCode = true;
		}
	}

	this.handlePostResponse = function($scope, response){
		if (response.pinValidationFailed){
			this.pinError = new PinError(response);
			$scope.status = this.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "form";
			this.form.pin = "";
			this.setFocusOnPin = true;
		}else if(response.invalidAccountNumber){
			this.invalidAccountNumber = true;
			this.form.pin = "";
			this.setFocusOnAccountNumber = true;
			$scope.status = 'form';
		} else if (response.error) {
			$scope.status = 'error';
		} else if (response == "true") {
			$scope.status = 'success';
		}
	}
}
ChangePinView = function(state) {
	if (state === undefined || state != 'form-entry') {
		throw "undefined or unsupported state";
	}
	this.actOnState(state);
}

ChangePinView.prototype = {
	setState: function(state, response) {
		if (state === undefined || !/^form-submit|success|failed|existing-pin-invalid$/.test(state)) {
			throw "undefined or unsupported state";
		}
		this.actOnState(state, response);
	},

	actOnState: function(state, response) {
		switch(state) {
			case "form-entry":
			case "success":
			case "failed":
				this.init();
				break;
			case "existing-pin-invalid":
				this.existingPin = "";
				this.existingPinValid = false;
				this.existingPinFormatValid = false;
				this.showExistingPinFormatError = false;
				this.existingPinErrors = new PinError(response);
				this.setFocusOnExistingPin = true;
				break;
		}
		this.state = state;
	},

	init : function() {
		this.pin = "";
		this.pinValid = false;
		this.showPinError = false;

		this.confirmPin = "";
		this.confirmPinValid = false;
		this.showConfirmPinError = false;

		this.existingPin = "";
		this.existingPinValid = true;
		this.existingPinFormatValid = false;
		this.showExistingPinFormatError = false;
	},

	validate : function() {
		this.existingPinErrors = undefined;
		
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;

		this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
		this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin && this.confirmPin.length == 4;

		this.existingPinFormatValid = /^[0-9]{4}$/.test(this.existingPin);
		this.showExistingPinFormatError = !this.existingPinFormatValid && this.existingPin && this.existingPin.length == 4
		if (this.existingPin && this.existingPin.length > 0) {
			this.existingPinValid = true;
		}
	}
};
function SwappableBoltons($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		return;
	} else {
		$scope.status = "success";
	}

	if (jQuery.isEmptyObject(obj.swappableBoltOnsForTariff)){
		this.boltonSection = 'NO_BOLTONS';
		return;
	}

	this.allCoreDataBoltOns = obj.swappableBoltOnsForTariff.allCoreDataBoltOns;
	this.allPromotionalBoltOns = obj.swappableBoltOnsForTariff.promotionalBoltOns;
	this.currentBoltOn = obj.currentBoltOn;
	this.webDailyBolton = obj.swappableBoltOnsForTariff.webDailyBoltOn;
	this.boltonSection = null;
	this.deviceChangeWarningMessage = "";
	this.deviceTypes = [];
	this.coreDataBoltOnsForDevice = [];
	this.selectedBolton = null; 
	this.webDailyCoreDataBoltonsList = [];
	this.selectedDevice = null;
	this.hasWebDailyBoltOnForSelectedDeviceType = false;

	var swappableCoreBoltons =  filter(this.allCoreDataBoltOns, function(obj) {
		return !obj.o2WebDaily;
	}, this);

	//set view
	if (swappableCoreBoltons.length != 0) {
			this.boltonSection = 'CORE_DATA';
			var description = getDeviceTypeDescription(this.currentBoltOn.deviceType);
			//set device type for select box
			each(obj.swappableBoltOnsForTariff.deviceTypes, function(deviceType) {
				var deviceTypeObj = {name: deviceType, description: getDeviceTypeDescription(deviceType)};
				this.deviceTypes.push(deviceTypeObj);
				//set current device type on page load
				if (this.currentBoltOn.deviceType === deviceTypeObj.name) {
					this.selectedDevice = deviceTypeObj;
				};
			}, this);
			//prepare default list of swappable boltons
			this.prepareSwappableCoreBoltOnsListForSelctedDevice(this.selectedDevice.name);
			this.hasWebDailyBoltOnFor(this.selectedDevice.name);
	} else if (this.allPromotionalBoltOns && this.allPromotionalBoltOns.length != 0 ){
		this.boltonSection = 'PROMOTIONAL';
	} else if (this.webDailyBolton){
		this.boltonSection = 'WEB_DAILY';
	} 
}

SwappableBoltons.prototype.prepareSwappableCoreBoltOnsListForSelctedDevice = function(deviceType) {
	if (deviceType === 'SMARTPHONE' || deviceType === 'STANDARD') {
		this.coreDataBoltOnsForDevice = filter(this.allCoreDataBoltOns, function(obj) {
			return (obj.deviceType === 'SMARTPHONE' || obj.deviceType === 'STANDARD') && !obj.o2WebDaily;
		}, this);
	} else {
		this.coreDataBoltOnsForDevice = filter(this.allCoreDataBoltOns, function(obj) {
			return obj.deviceType === deviceType && !obj.o2WebDaily;
		}, this);
	};
};

SwappableBoltons.prototype.hasWebDailyBoltOnFor = function(deviceType) {
	this.hasWebDailyBoltOnForSelectedDeviceType = false;
  if (deviceType === 'SMARTPHONE' || deviceType === 'STANDARD') {
		this.webDailyCoreDataBoltonsList = filter(this.allCoreDataBoltOns, function(obj) {
			return (obj.deviceType === 'SMARTPHONE' || obj.deviceType === 'STANDARD') && obj.o2WebDaily;
		}, this);
	} else {
		this.webDailyCoreDataBoltonsList = filter(this.allCoreDataBoltOns, function(obj) {
			return obj.deviceType === deviceType && obj.o2WebDaily;
		}, this);
	};
  if (this.webDailyCoreDataBoltonsList.length != 0) {
		this.hasWebDailyBoltOnForSelectedDeviceType = true;
  };
};

SwappableBoltons.prototype.detectDeviceChange = function() {
	this.selectedBolton = null;
	this.deviceChangeWarningMessage = '';
	this.prepareSwappableCoreBoltOnsListForSelctedDevice(this.selectedDevice.name);
	this.hasWebDailyBoltOnFor(this.selectedDevice.name);
	if (this.currentBoltOn.deviceType === 'IPHONE' && this.selectedDevice.name != 'IPHONE') {
		this.deviceChangeWarningMessage = "As you've selected '" + this.selectedDevice.description + "' this means you won't have access to some iPhone features.";
	}
	if (this.currentBoltOn.deviceType === 'BLACKBERRY' && this.selectedDevice.name != 'BLACKBERRY') {
		this.deviceChangeWarningMessage = "As you've selected '" + this.selectedDevice.description + "' this means you won't have access to some Blackberry features.";
	};
};

function getDeviceTypeDescription(deviceType) {
	if (deviceType === "IPHONE") {
		return "iPhone";
	} else if (deviceType === "BLACKBERRY") {
		return "BlackBerry";
	} else if (deviceType === "SMARTPHONE") {
		return "Smartphone";
	} else if (deviceType === "STANDARD") {
		return "Standard phone";
	}
}
function CreatePin($scope, obj) {
	  if (obj.error) {
	    $scope.status = "error";
	    $scope.showCallToAction = false;
	  } else {
	    $scope.showCallToAction = true;
	    $scope.status = "success";
	    this.pinCreated = obj.pinCreated;
	  }

	  

}

function CreatePinState() {
			this.pin = ""
			this.pinValid = false,
			this.showPinError = false,
			this.confirmPin = "",
			this.confirmPinValid = false,
			this.showConfirmPinError = false


		this.validate = function() {
			this.pinValid = /^[0-9]{4}$/.test(this.pin);
			this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
			this.showPinError = !this.pinValid && this.pin.length == 4;
			this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin.length == 4;
		}
}
function PaymentDetails($scope, obj) {
	
	if(obj.pinValidationFailed){
		$scope.pinError = new PinError(obj);
		$scope.status = $scope.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "success";
		$scope.view = "validatePin";
		$scope.setFocused = true;
	}else if (obj.error) {
		$scope.status = "error";
	}else{
		$scope.status = "success";
		this.paymentDetails = obj;
		$scope.view = "paymentDetails";
	}	
}

function PinValidationForm(){
	this.pin;
	this.showPinError = false;
	this.pinValid = false;

	this.isPinValid = function(){
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;
	}
}

function PaymentType($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
	}else if(obj.hasExceededMaximumAttempts){
		$scope.status = "maxAttemptsError";
	} else {
		$scope.status = "success";
		this.paymentType = obj.paymentType;
		this.userHasPin = obj.userHasPin;
	}
}


function PinError(obj) {
	this.pinValidationFailed= obj.pinValidationFailed;
	this.hasExceededMaximumAttempts = obj.hasExceededMaximumAttempts;
	this.message = obj.message;
	this.remainingPinAttempts = obj.remainingPinAttempts;
}

function PendingTariff($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
  } else {
    $scope.status = "success";
    this.boltons = obj.coreDataOrPromotionalBoltOns ? obj.coreDataOrPromotionalBoltOns.concat(obj.boltOnsOtherThanCoreDataAndPromotional) : obj.boltOnsOtherThanCoreDataAndPromotional;
    this.startDate = obj.startDate;
    this.endDate = obj.endDate;
    this.monthlyFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : undefined;
    this.tariffName = obj.tariffName;
    this.minimumTermInMonths = obj.minimumTermInMonths;
    this.description = obj.tariffDescription;
    this.cancelToken = obj.cancelToken;
  }


  $scope.getBoltonBillingInterval = function(interval) {
    if(interval ==='MONTHLY') {
      return 'per month';
    } else if(interval==='ONE_OFF') {
      return 'one-off';
    }
  }
}
function PaperFreeBilling($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
    $scope.showCallToAction = false;
  } else {
    $scope.showCallToAction = true;
    $scope.status = "success";
    this.isPaperFreeBilling = obj.status;
  }
}
ResetPinView = function(state) {
	if (state === undefined || state != 'form-entry') {
		throw "undefined or unsupported state";
	}
	this.actOnState(state);
}

ResetPinView.prototype = {
	setRemainingAttempts: function(value) {
		this.remainingAttempts = value;
	},

	setState: function(state) {
		if (state === undefined || !/^form-submit|success|failed|payment-number-invalid|payment-details-loacked$/.test(state)) {
			throw "undefined or unsupported state";
		}
		this.actOnState(state);
	},

	actOnState: function(state) {
		switch(state) {
			case "form-entry":
			case "success":
			case "failed":
			case "payment-details-loacked":
				this.init();
				break;
			case "payment-number-invalid":
				this.paymentNumber = "";
				this.paymentNumberValid = false;
				this.paymentNumberFormatValid = false;
				this.showPaymentNumberFormatError = false;
				this.setFocusOnPaymentNumber = true;
				break;
		}
		this.state = state;
	},

	init : function() {
		this.pin = "";
		this.pinValid = false;
		this.showPinError = false;

		this.confirmPin = "";
		this.confirmPinValid = false;
		this.showConfirmPinError = false;

		this.paymentNumber = "";
		this.paymentNumberValid = true;
		this.paymentNumberFormatValid = false;
		this.showPaymentNumberFormatError = false;

		this.remainingAttempts = 3;
	},

	validate : function() {
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;

		this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
		this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin && this.confirmPin.length == 4;

		this.paymentNumberFormatValid = /^[0-9]{4}$/.test(this.paymentNumber);
		this.showPaymentNumberFormatError = !this.paymentNumberFormatValid && this.paymentNumber && this.paymentNumber.length == 4
		if (this.paymentNumber && this.paymentNumber.length > 0) {
			this.paymentNumberValid = true;
		}
	}
};
function CreditCardDetails() {
	this.cardType;
	this.cardNumber;
	this.expiryMonth;
	this.expiryYear;
	this.pin;
}

function CreditCardDetailsPostForm(creditCardDetails) {
	this.cardType = creditCardDetails.cardType;
	this.cardNumber = creditCardDetails.cardNumber;
	this.expiryMonth = creditCardDetails.expiryMonth.month;
	this.lastTwoDigitsOfExpiryYear = creditCardDetails.expiryYear;
	this.pin = creditCardDetails.pin;
}

function CreditCard($filter){
	this.creditCardDetails = new CreditCardDetails();
	this.validations = new Validations();
	var currentYear = parseInt($filter('date')(new Date(), 'yy'));
	var currentMonth = parseInt($filter('date')(new Date(), 'MM'));

	this.months = getMonthValues();
	this.years = getYearsFromCurrentYear(currentYear, 10);
	this.cardTypes = ['VISA', 'Mastercard'];

	this.validateCardType = function(){
		if($.inArray(this.creditCardDetails.cardType, this.cardTypes) > -1){
			this.validations.isCardTypeValid = true;
			this.validations.showCardTypeError = false;
		}else{
			this.validations.isCardTypeValid = false;
			this.validations.showCardTypeError = true; 
		}
		this.validations.showCardNumberError =false;
	}

	//Validate the credit card number
	this.validateNumber=function() {
		if (!this.creditCardDetails.cardNumber) {
			this.validations.isCreditCardNumberValid = false;
			this.validations.showCardNumberError = !this.validations.isCreditCardNumberValid;
		} else {
			if(this.creditCardDetails.cardType == 'VISA'){
				this.validatePattern(/^4([0-9]{12}|[0-9]{15})$/);
			} else if(this.creditCardDetails.cardType == 'Mastercard'){
				this.validatePattern(/^5[0-9]{15}$/);
			}
		}
	}


	this.validatePattern = function(pattern) {
			this.validations.isCreditCardNumberValid = pattern.test(this.creditCardDetails.cardNumber);
			this.validations.showCardNumberError = !this.validations.isCreditCardNumberValid;
	} 

	//Check if selected year is current year and set months accordingly
	this.checkPastDate = function() {
		if(!this.creditCardDetails.expiryMonth ||!this.creditCardDetails.expiryYear || this.creditCardDetails.expiryYear == currentYear && this.creditCardDetails.expiryMonth.month < currentMonth) {
			this.validations.isExpiryDateValid = false;
		}else{
			this.validations.isExpiryDateValid = true;
		}
		this.validations.showExpiryDateError = !this.validations.isExpiryDateValid;
	}

	this.validatePin = function() {
		this.validations.isPinValid = this.creditCardDetails.pin && /^[0-9]{4}$/.test(this.creditCardDetails.pin);
		this.validations.showPinError = !this.validations.isPinValid;				
	}

	this.validateAll  = function() {
		this.pinError = undefined;
		this.validateCardType();
		this.validateNumber();
		this.checkPastDate();
		this.validatePin();
		this.setFocus();
	}

	this.setFocus = function (){
		this.setFocusOnCreditCardNumber = !this.validations.isCreditCardNumberValid;
		this.setFocusOnPin = !this.setFocusOnCreditCardNumber && !this.validations.isPinValid;

	}

	this.handlePostResponse = function($scope, response){

		if(response.pinValidationFailed){
			this.pinError = new PinError(response);
			$scope.status = this.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "form";
			$scope.setEnterPinFocused = true;
			this.creditCardDetails.pin = undefined;
			this.setFocusOnPin = true;
		}else if(response.invalidCreditCardNumber){
			$scope.invalidCreditCardNumber =true;
			$scope.status = 'form';
			this.creditCardDetails.pin = undefined;
			this.setFocusOnCreditCardNumber = true;
		}else if(response.error) {
			$scope.status = 'error';
		}else if(response=="true") {
			$scope.status = 'success';
		}
	}
}

function Validations(){
	this.isCreditCardNumberValid = false;
	this.showCardNumberError = false;
	this.isCardTypeValid = false;
	this.isExpiryDateValid= false;
	this.showCardTypeError = false;
	this.showExpiryDateError = false;
	this.showPinError = false;
	this.isPinValid = false;
	
}


function Month(month) {
	this.month = month;

	if(month<10) {
		this.monthText = "0" + month;
	}else {
		this.monthText = month.toString();
	}
}

function getMonthValues() {
	var months = [];
	for(month = 1; month <= 12 ; month++) {
		months.push(new Month(month));
	}
	return months;
}

function getYearsFromCurrentYear(currentYear, noOfYears){
	var years = [];
	for(year = currentYear; year <= currentYear + noOfYears ; year++) {
		years.push(year);
	}
	return years;
}

function SwappableO2TravelBolton($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
        return;
    } else {
        $scope.status = "success";
    }

    this.name = obj.name;
    this.id = obj.id;
    this.description = obj.description;
    this.monthlyFee = (obj.monthlyFee)?obj.monthlyFee:null;
}
function SwappableTravelBolton($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
    $scope.showCallToAction = false;
  } else {
    $scope.showCallToAction = true;
    $scope.status = "success";
    this.swappableBoltOnsList = obj;
    this.swappableTravelBolton = filter(this.swappableBoltOnsList, function(obj){
      	return obj.id === "9003"
      });
    this.hasSwappableTravelBolton = this.swappableTravelBolton ? true : false;
  }
}
function Rewards($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.rewards = obj;
	}
}
function DesktopPaygBoltons(boltons) {
	this.dataBoltons = [];
	this.otherBoltons = [];
	this.dataBoltOnsCount = 0;
	this.otherBoltOnsCount = 0;
    this.hasPendingRechargeBolton = false;
	for (var count = 0; count < boltons.length; count++) {
        var bolton = boltons[count]
        if (bolton.status == 'ACTIVE' || bolton.status == 'PENDING_RECHARGE') {
            if (bolton.boltOnCategory == "WAP") {
                this.dataBoltons.push(new DesktopPaygBolton(boltons[count]));
                this.dataBoltOnsCount++;
            } else {
                this.otherBoltons.push(new DesktopPaygBolton(boltons[count]));
                this.otherBoltOnsCount++;
            }
        }
        if(!this.hasPendingRechargeBolton) {
            this.hasPendingRechargeBolton = (bolton.status == 'PENDING_RECHARGE')? true : false;
        }

  	}
}

function DesktopPaygBolton(obj) {

	var getBillingInterval = function (billingInterval) {
		if(billingInterval == "MONTHLY") {
			return "per month";
		} else if(billingInterval == "ONE_OFF") {
			return "one-off";
		}
	};

	var getCost = function(billingInterval, monthlyCost, oneOffCost) {
		if (billingInterval == "MONTHLY") {
			return monthlyCost ? monthlyCost.valueInPence : null;
		} else if (billingInterval == "ONE_OFF") {
			return oneOffCost ? oneOffCost.valueInPence : null;
		}
	};

	this.name = obj.name;
	this.status = obj.status;
	this.billingInterval = getBillingInterval(obj.billingInterval);
	this.boltOnFee = getCost(obj.billingInterval, obj.monthlyCost, obj.oneOffCost);
}
function TopupHistory($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.topUps = obj;
	}
}
function TariffDetails($scope, obj) {
    var prop = defaultProperties.widgets.payg.tariffdetails;

    var getStatus = function(tariff) {
        if(tariff.accountStatus == "ACTIVE" || tariff.accountStatus == "PENDING_RECHARGE") {
            return prop.status[tariff.accountStatus];
        }
        if(tariff.accountStatus == "PENDING_REMOVAL") {
            if(tariff.nextPaymentDate == null) {
                return prop.status["OTHER"];
            }
            if(tariff.nextPaymentDateIsInPast) {
                return prop.status[tariff.accountStatus].nextPaymentDateInPast;
            }
            return prop.status[tariff.accountStatus].nextPaymentDateNotInPast;
        }
        return prop.status["OTHER"];
    }

    if (obj.error) {
        $scope.status = "error";
    } else {
        $scope.status = "success";
        this.name = obj.currentTariff ? obj.currentTariff.tariffName : null;
        this.description = obj.currentTariff ? obj.currentTariff.description : null;
        this.status = obj.currentTariff ? getStatus(obj.currentTariff): null;
        this.allowanceText = getAllowanceText(obj);
        this.anniversaryDate = obj.anniversaryDate;
        this.canHoldConfigurablePostcode = obj.currentTariff.maxParametersAllowed > 0;
    }
}
function PendingTariffDetails($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
    } else {
        $scope.status = "success";
        this.name = obj.pendingTariff ? obj.pendingTariff.tariffName : null;
        this.description = obj.pendingTariff ? obj.pendingTariff.description : null;
        this.status = "To be added on anniversary date";
        this.anniversaryDate = obj.anniversaryDate;
        this.startDate = obj.pendingTariff.startDate;
        this.startDateWithinAMonthFromToday = obj.pendingTariff.startDateWithinAMonthFromToday;
    }
}
angular.module("phoneDetailsService", [])
.service("phoneDetailsService", ['$http', function($http) {
    var phoneDetailsService = {};

    phoneDetailsService.getSummary = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.common.phoneDetails)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return phoneDetailsService;
}]);
angular.module("myOrdersService", [])
.service("myOrdersService", ['$http', function($http) {
    var myOrdersService = {};

    myOrdersService.getOrders = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.common.myOrders)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }
    return myOrdersService;
}]);
angular.module("offersService", [])
.service("offersService", ['$http', function($http) {
    var offersService = {};

    offersService.getOffers = function(successCallback, errorCallback) {
        $http.get(defaultProperties.serviceEndpoints.common.offers)
        .success(function(successResponse) {
            successCallback(successResponse);
        })
        .error(function(errorResponse) {
            errorCallback();
        });
    }

    offersService.setOfferPreferences = function(offerPreference, successCallback, errorCallback) {
        $http.post(defaultProperties.serviceEndpoints.common.offers, {selectedOfferId:offerPreference.selectedOfferId, selectedAction:offerPreference.selectedAction}, {headers: { 'Content-Type': 'application/json' }})
        .success(function() {
            successCallback();
        })
        .error(function(errorResponse) {
            errorCallback();
        });
    }
    return offersService;
}]);
angular.module("paperFreeBillingService", [])
.service("paperFreeBillingService", ['$http', function($http) {
    var paperFreeBillingService = {};

    paperFreeBillingService.getStatus = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getPaperFreeBilling)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    paperFreeBillingService.setStatus = function(callback) {
        $http.post(defaultProperties.serviceEndpoints.paym.setPaperFreeBilling, {paperFreeBills: true}, {headers: { 'Content-Type': 'application/json' }})
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return paperFreeBillingService;
}]);
angular.module("swappableTravelBoltOnService", [])
.service("swappableTravelBoltOnService", ['$http', function($http) {
	var swappableTravelBoltOnService = {};

  swappableTravelBoltOnService.getSwappableBoltOns = function(callback) {
    $http.get(defaultProperties.serviceEndpoints.paym.getswappabletravelboltons)
    .success(function(successResponse) {
      callback(successResponse);
    }).error(function(errorResponse) {
      callback({error: defaultProperties.errorMessage});
    });
  }
  return swappableTravelBoltOnService;
}]);
angular.module("paymBoltonsService", [])
.service("paymBoltonsService", ['$http', function($http) {
  var paymBoltonsService = {};

  paymBoltonsService.getBoltonsSummary = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getBoltonsSummary)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paymBoltonsService;
}]);
angular.module("securityPinService", [])
.service("securityPinService", ['$http', function($http) {
	var securityPinService = {};

	securityPinService.createPin = function(pin, callback) {
		$http.post(defaultProperties.serviceEndpoints.paym.createPin, pin)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	};

	securityPinService.resetPin = function(newPin, paymentNumber, callback) {
		$http.put(defaultProperties.serviceEndpoints.paym.resetPin, {'newPin': newPin, 'paymentNumber': paymentNumber})
		.success(function(successResponse) {
			callback('success');
		})
		.error(function(errorResponse, status) {
			if (status == 412)
				callback('payment-number-invalid', errorResponse.remainingAttempts);
			else if (status == 403)
				callback('payment-details-loacked');
			else
				callback('failed');
		});
	}

	securityPinService.changePin = function(newPin, existingPin, callback) {
		$http.put(defaultProperties.serviceEndpoints.paym.changePin, {'newPin': newPin, 'existingPin': existingPin})
		.success(function(successResponse) {
			callback('success', successResponse);	
		})
		.error(function(errorResponse, status) {
			if(status == 403){
				callback('existing-pin-invalid', errorResponse);	
			}else{
				callback('failed', errorResponse)	
			}
			
		});
	}

	return securityPinService;
}]);
angular.module("pendingTariffService", [])
.service("pendingTariffService", ['$http', function($http) {
	var pendingTariffService = {};

  pendingTariffService.getPendingTariffDetail = function(callback) {
    $http.get(defaultProperties.serviceEndpoints.paym.getpendingtariff)
    .success(function(successResponse) {
      callback(successResponse);
    }).error(function(errorResponse) {
      callback({error: defaultProperties.errorMessage});
    });
  }
  return pendingTariffService;
}]);
angular.module("paymentDetailsService", [])
.service("paymentDetailsService", ['$http', function($http) {
    var paymentDetailsService = {};
    var paymentType;
    var paymentDetails;
    var pinValidated;
  
    paymentDetailsService.validatePin = function(pin, callback) {
        
        pinValidated = false;

        $http.post(defaultProperties.serviceEndpoints.paym.validatePin, pin)
        .success(function(successResponse) {
            callback(successResponse);
            paymentDetails = successResponse;
            pinValidated = true;
        })
        .error(function(errorResponse, status) {
            if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});     
            }
            
        });
    }

    paymentDetailsService.getPaymentType = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.paymentType)
        .success(function(successResponse) {
            callback(successResponse);
            paymentType = successResponse;
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    paymentDetailsService.getUserPaymentType = function(){
        return paymentType;
    }

    paymentDetailsService.getUserPaymentDetails = function(){
        return paymentDetails;
    }

    paymentDetailsService.postCreditCardPaymentDetails= function(creditCard, callback){
        $http.post(defaultProperties.serviceEndpoints.paym.paymentdetials.changepaymentdetails.creditcard, creditCard)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse, status) {
            if(status == 400){
                callback({invalidCreditCardNumber: true});
            }else if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});
            }
        });
    }

    paymentDetailsService.postDirectDebitDetails = function(directDebitForm, callback){
        $http.post(defaultProperties.serviceEndpoints.paym.paymentdetials.changepaymentdetails.directdebit, directDebitForm)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse, status) {
            if(status == 400){
                callback({invalidAccountNumber: true});
            }else if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});
            }
        });
    }

    paymentDetailsService.hasPinValidated = function(){
        return pinValidated;
    }

    return paymentDetailsService;
}]);
angular.module("swappableBoltOnService", [])
.service("swappableBoltOnService", ['$http', function($http) {
	var swappableBoltOnService = {};

      swappableBoltOnService.getSwappableBoltOns = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getswappableboltons)
        .success(function(successResponse) {
          callback(successResponse);
        }).error(function(errorResponse) {
          callback({error: defaultProperties.errorMessage});
        });
      }

    swappableBoltOnService.getO2TravelSwappableBoltOns = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getswappableo2travelboltons)
            .success(function(successResponse) {
                callback(successResponse);
            }).error(function(errorResponse) {
                callback({error: defaultProperties.errorMessage});
            });
    }
  return swappableBoltOnService;
}]);

angular.module("rewardsService", [])
.service("rewardsService", ['$http', function($http) {
    var rewardsService = {};

    rewardsService.getRewards = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.payg.rewards)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return rewardsService;
}]);
/*This service has being used to retrieve tariff*/
angular.module("tariffDetailsService", [])
.service("tariffDetailsService", ['$http', function($http) {
  var tariffDetailsService = {};

  tariffDetailsService.getDetails = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getTariffDetails)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return tariffDetailsService;
}]);
angular.module("topupService", [])
.service("topupService", ['$http', function($http) {
    var topupService = {};

    topupService.getHistory = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.payg.topuphistory)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return topupService;
}]);
angular.module("offersModule", ['ngRoute'])
.controller("offersController.getOffers", ['$scope', '$rootScope', 'offersService',
	function($scope, $rootScope, offersService) {
        $scope.getOffers = function(){
            $scope.offerAcceptanceStatus = "loading";
            offersService.getOffers(function(offersResponse) {
                $scope.offers = new Offers($scope, offersResponse).offers;
                $scope.useCommon = true;
            },
            function(){
                $scope.offers = new Offers($scope, []).offers;
            });
        };

        $scope.getOffers();

        $scope.setOfferPreferences = function(selectedOfferId, selectedAction, url, newWindow){
           offerPreference = new OfferPreference(selectedOfferId, selectedAction);
           offersService.setOfferPreferences(offerPreference, function(){
                if(selectedAction=="negative"){
                    $scope.offerAcceptanceStatus = "negative";
                }else if(selectedAction=="positive"){
                    $scope.offerAcceptanceStatus = "positive";
                }
                $($.find('.overlay-close')[0]).bind("click", function(){
                    if(url!=undefined){
                        if(newWindow == true){
                            window.open(url, "_blank");
                            window.location.replace(MYMOBILE_BASE_URL+ "myoffers/offers?disambiguation_id="+$rootScope.disambiguationId);
                        }else{
                            window.location.replace(MYMOBILE_BASE_URL + url);
                        }
                    }else{
                        window.location.replace(MYMOBILE_BASE_URL+ "myoffers/offers?disambiguation_id="+$rootScope.disambiguationId);
                    }
                });
           }, function(){
                $scope.offerAcceptanceStatus = "error";
           });
        };
	}
]);
angular.module("myo2-desktop", ['compile',
  'ngAnimate',
  'myo2Filters',
  'myo2Directives',
  'ngSanitize',
  'widgetModule',
  'userDetailsService',
  'userDetailsModule',
  'myLatestBillDetailsService',
  'myLatestBillModule',
  'recentChargesService',
  'myRecentChargesModule',
  'myAllowancesModule',
  'allowancesService',
  'allowanceDetailsModule',
  'upgradeEligibilityModule',
  'upgradeEligibilityService',
  'payMonthlyTariffService',
  'myTariffSummaryModule',
  'paygAccountSummaryService',
  'myTariffDetailsModule',
  'myBoltonsModule',
  'myBoltonsService',
  'phoneDetailsModule',
  'phoneDetailsService',
  'myOrdersModule',
  'myOrdersService',
  'viewPaymentDetailsModule',
  'paymentDetailsService',
  'balanceAndAllowanceSummaryModule',
  'paygAccountSummaryService',
  'topupModule',
  'topupService',
  'paperFreeBillingModule',
  'paperFreeBillingService',
  'desktopBoltonsModule',
  'paygBoltonsService',
  'rewardsModule',
  'rewardsService',
  'myPhonePlanModule',
  'myPhonePlanService',
  'securityPinService',
  'tariffDetailsModule',
  'boltonsSummaryModule',
  'tariffModule',
  'pendingTariffService',
  'myCallingPlanSummaryModule',
  'changePaymentDetailsModule',
  'offersService',
  'offersModule',
  'paymBoltonsModule',
  'paymBoltonsService',
  'swappableTravelBoltOnService',
  'swappableTravelBoltOnModule',
  'swappableBoltOnModule',
  'swappableBoltOnService',
  'tariffDetailsService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/bills',
      {
        templateUrl: "templates/default/paym/billdetailshome.html"
      });
  }
])
.run(['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
        /*we have this run because there can be multiple possible SPAs in mymobile.
        Every angular app will have its own root route(view). So to address this following logic.
        We cannot have a single route with '/' because for every angular app it is expected that '/'
        will render a different template*/
        $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
            $anchorScroll();
        });
        if($location.$$absUrl.indexOf('mymobile/paymonthly/bills')!=-1)
        {
          $location.path('/bills').replace();          
        }
        
}])
.controller("rootController", ["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.defaultProperties = defaultProperties;
    $rootScope.pageLoading = true;
    $rootScope.properties = properties;
    $rootScope.location = $location.$$absUrl;
   // $rootScope.disambiguationId = getParameterByName('disambiguation_id');
    $rootScope.getModuleProperties = function(module,useCommonProperties) {
        if(useCommonProperties){
          return defaultProperties.widgets['common'][module];
        }
        else{
          return defaultProperties.widgets[USER_TYPE][module];
        }
      }
    }
])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location','$rootScope', function($q, $location, $rootScope) {
    return {
        'request': function (config) {
            var disambiguation_id = $rootScope.disambiguationId;
            if(disambiguation_id != null  && (config.url.indexOf("_assets") == -1) && (config.url.indexOf(".svg") == -1) ) {
                config.url = config.url + '?disambiguation_id=' + disambiguation_id;
            }
            return config || $q.when(config);
        },

      'responseError' : function(rejection) {
        if(rejection.status == 401) {
          window.location.href = rejection.headers('loginPageUrl');
        }
        return $q.reject(rejection);
      }
    }
  }]);
}])
.run(['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
    $rootScope.svgSupported = Modernizr.svg;
}]);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

angular.element(document).ready(function() {
    addSecondaryNavMarkup();

    angular.element(window).on('resize', function() {
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



//Functional belt for common operations
function each(list, cb, context) {
  if (!list) return;
  for (var i = 0; i < list.length; i++) {
    if (!cb) return;
    cb.call(context, list[i], i);
  }
}

function filter(list, cb, context) {
  var results = [];
  if (list == null) return results;
  if (!cb) return list;
  each(list, function(value, index, list) {
    if (cb.call(context,value, index, list)) results.push(value);
  });
  return results;
};

function merge(list1, list2) {
  var results = [];
  each(list1, function(value) {
    results.push(value);
  });
  each(list2, function(value) {
    results.push(value);
  });
  return results;
}
angular.module("phoneDetailsModule", ['ngRoute'])
.controller("phoneDetailsController.getSummary", ['$scope', 'phoneDetailsService',
	function($scope, phoneDetailsService) {
		phoneDetailsService.getSummary(function(phoneDetailsResponse) {
			$scope.phoneDetails = new PhoneDetails($scope, phoneDetailsResponse);
		});
	}
]);
angular.module("myOrdersModule", [])
.controller("myOrdersController.getRecentOrders", ['$scope', 'myOrdersService', 
	function($scope, myOrdersService) {
		myOrdersService.getOrders(function(myOrdersResponse) {
			$scope.myRecentOrders = new MyRecentOrders($scope, myOrdersResponse);
		});
	}
]);
angular.module("changePaymentDetailsModule", ['ngRoute'])
 .config(['$routeProvider', function($routeProvider) {
    $routeProvider
            .when('/changepaymentdetails',
            {			
            	controller: "changePaymentDetailsController.changepaymentdetailsInit",
                templateUrl: ASSET_URL + "templates/default/paym/changepaymentdetails.html"
            })
            .otherwise({
      			redirectTo: '/bills'
      		});
        }
    ])
	.controller("changePaymentDetailsController.changepaymentdetailsInit", ['$scope', '$location','paymentDetailsService',
	function($scope, $location,paymentDetailsService) {
		
		//Check if pin validation is done else redirect user to bills page
		if(paymentDetailsService.hasPinValidated()){
			$scope.payment = new PaymentType($scope, paymentDetailsService.getUserPaymentType());
			$scope.paymentDetails = new PaymentDetails($scope, paymentDetailsService.getUserPaymentDetails()).paymentDetails;
			$scope.status = 'form';
		}else{
			$location.path("/bills");
		}
	}
		
])
.controller("changeCreditCardDetailsController.setupCreditCardForm", ['$scope', '$filter', 'paymentDetailsService',
	function($scope, $filter, paymentDetailsService) {
		$scope.creditCard = new CreditCard($filter);
				
		$scope.postCreditCardPaymentDetails = function() {
			$scope.pinValidationFailed = false;
			$scope.invalidCreditCardNumber = false;
			$scope.creditCard.validateAll();
			if ($scope.creditCard.validations.isCardTypeValid && $scope.creditCard.validations.isCreditCardNumberValid
				&& $scope.creditCard.validations.isExpiryDateValid && $scope.creditCard.validations.isPinValid) {				
				$scope.status = 'loading';
				paymentDetailsService.postCreditCardPaymentDetails(new CreditCardDetailsPostForm($scope.creditCard.creditCardDetails), function(response){
					$scope.creditCard.handlePostResponse($scope, response);
				});
			}
		}
	}
])
.controller("changeDirectDebitDetailsController.setupDirectDebitForm", ['$scope', 'paymentDetailsService',
	function($scope, paymentDetailsService) {
		$scope.directDebit = new DirectDebit();
		$scope.updateDirectDebitDetails = function() {
			$scope.directDebit.pinVerificationFailed = false;
			$scope.directDebit.invalidAccountNumber = false;
			$scope.directDebit.validateDirectDebitForm();
			if (!$scope.directDebit.saveDisabled) {
				$scope.status = 'loading';
				paymentDetailsService.postDirectDebitDetails($scope.directDebit.form, function(response){
					$scope.directDebit.handlePostResponse($scope, response);
				});
			}
		}
	}
]);
angular.module("paymBoltonsModule", ['ngRoute'])
  .controller("paymBoltonsController.getBoltonsSummary", ['$rootScope', '$scope', 'paymBoltonsService',
    function($rootScope, $scope, paymBoltonsService) {
      if (!$rootScope.paymBoltons) {
        paymBoltonsService.getBoltonsSummary(function(response) {
          if (response.length != 0) {
            $rootScope.paymBoltons = new PaymBoltons(response);
            if ($rootScope.paymBoltons.myCoreOrPromotionalDataBoltonList.length == 0 && $rootScope.paymBoltons.myDataBoltonList.length == 0 && $rootScope.paymBoltons.myboltonList.length == 0) {
              $scope.showCallToAction = false;
            } else {
              $scope.showCallToAction = true;
            };
          } else {
            $scope.showCallToAction = false;
          }
          if (response.error) {
            $scope.status = 'error'
          } else {
            $scope.status = 'success'
          }
        });
      }
    }
  ]);
angular.module("viewPaymentDetailsModule", ['ngRoute'])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/createpin', {
				controller: "viewPaymentDetailsController.createPin",
				templateUrl: ASSET_URL + "templates/default/paym/setuppin.html"
			})
			.when('/resetpin', {
				controller: "viewPaymentDetailsController.resetPin",
				templateUrl: ASSET_URL + "templates/default/paym/resetpin.html"
			})
			.when('/changepin', {
				controller: "viewPaymentDetailsController.changePin",
				templateUrl: ASSET_URL + "templates/default/paym/changepin.html"
			})
			.otherwise({
      			redirectTo: '/bills'
      		});
	}
])
.controller("viewPaymentDetailsController.getPaymentType", ['$scope', 'paymentDetailsService',
	function($scope, paymentDetailsService) {
		paymentDetailsService.getPaymentType(function(paymentTypeResponse) {
			$scope.paymentType = new PaymentType($scope, paymentTypeResponse);
			$scope.view = "validatePin";
			$scope.$broadcast('success');
			
		});

		$scope.pinForm = new PinValidationForm();

		$scope.postPin = function() {
			$scope.status = 'loading';
			paymentDetailsService.validatePin($scope.pinForm.pin, function(paymentDetailsResponse) {
				if (paymentDetailsResponse.pinValidationFailed) {
					$scope.pinForm.pin = "";
					$scope.pinForm.pinValid = false;
				}
				$scope.paymentDetails = new PaymentDetails($scope, paymentDetailsResponse).paymentDetails;
			});
		}
	}
])
.controller("viewPaymentDetailsController.createPin", ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.createPinState = new CreatePinState();
		$scope.createPin = function(pin) {
			$scope.status = 'loading';
			securityPinService.createPin(pin, function(createPinResponse) {
				$scope.createpin = new CreatePin($scope, createPinResponse);
			});
		}

	}
])
.controller('viewPaymentDetailsController.resetPin', ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.resetPinView = new ResetPinView("form-entry");

		$scope.submitResetPin = function() {
			$scope.resetPinView.setState("form-submit");
			securityPinService.resetPin($scope.resetPinView.pin.toString(), $scope.resetPinView.paymentNumber.toString(), 
				function(state, remainingAttempts) {
					$scope.resetPinView.setState(state);
					remainingAttempts && $scope.resetPinView.setRemainingAttempts(remainingAttempts);
				}
			);
		};
	}
])
.controller('viewPaymentDetailsController.changePin', ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.changePinView = new ChangePinView("form-entry");

		$scope.submitChangePin = function() {
			$scope.changePinView.setState("form-submit");
			securityPinService.changePin($scope.changePinView.pin.toString(), $scope.changePinView.existingPin.toString(), 
				function(state, response) {
					$scope.changePinView.setState(state, response);
				}
			);
		};
	}
]);
angular.module("swappableTravelBoltOnModule", [])
.controller("swappableTravelBoltOnController.getSwappableBolton", ['$scope', 'swappableTravelBoltOnService',
  function($scope, swappableTravelBoltOnService) {
    swappableTravelBoltOnService.getSwappableBoltOns(function(response) {
      $scope.swappableTravelBoltOns = new SwappableTravelBolton($scope, response);
    });
  }
]);
angular.module("swappableBoltOnModule", ["ngRoute"])
    .controller("swappableBoltOnController.getSwappableBoltons", ['$scope', '$window', 'swappableBoltOnService',
      function($scope, $window, swappableBoltOnService) {
        swappableBoltOnService.getSwappableBoltOns(function(response) {
          $scope.swappableBoltOns = new SwappableBoltons($scope, response);
        });
        $scope.continueWithSelectedBolton = function(selectedDataBoltOn) {
            if (selectedDataBoltOn.o2WebDaily) {
                $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/removedatabolton?selectedDataBoltOn=' + selectedDataBoltOn.id;
            } else{
                $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/swapdatabolton?selectedDataBoltOn=' + selectedDataBoltOn.id;
            };
        }
      }
    ])
    .controller("swappableBoltOnController.getSwappableO2TravelBoltons", ['$scope', '$window', 'swappableBoltOnService',
        function($scope, $window, swappableBoltOnService) {
            swappableBoltOnService.getO2TravelSwappableBoltOns(function(response) {
                $scope.swappableO2TravelBolton = new SwappableO2TravelBolton($scope, response);
            });

            $scope.continueWithSelectedBolton = function(swappableO2TravelBolton) {
                    $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/swaptravelbolton?selectedDataBoltOn=' + swappableO2TravelBolton.id;
            }
        }
    ]);

angular.module("tariffModule", [])
  .controller(
  	"tariffController.getPendingTariff", ['$scope', 'pendingTariffService',
	  	function($scope, pendingTariffService) {
		    pendingTariffService.getPendingTariffDetail(function(pendingTariffResponse) {
		      if (!isEmpty(pendingTariffResponse)) {
		      	$scope.tariffDetail = new PendingTariff($scope, pendingTariffResponse);
		      }
		    });
  		}
])
.controller(
"tariffController.getCurrentTariff", ['$scope', 'payMonthlyTariffService', 'pendingTariffService',
	function($scope, payMonthlyTariffService, pendingTariffService) {
        payMonthlyTariffService.getTariffDetail(function(currentTariffResponse) {
            $scope.tariffDetail = new TariffDetail(currentTariffResponse);
            if (currentTariffResponse.error) {
              $scope.status = 'error';
            }
            else {
              $scope.status = 'success';
              $scope.showCallToAction = true;
            }
        });

        pendingTariffService.getPendingTariffDetail(function(pendingTariffResponse) {
		      if (!isEmpty(pendingTariffResponse)) {
		      	$scope.pendingTariff = new PendingTariff($scope, pendingTariffResponse);
		      }
		});
    }
]);
angular.module("paperFreeBillingModule", ['ngRoute'])
  .controller("paperFreeBillingController.getStatus", ['$scope', 'paperFreeBillingService',
  function($scope, paperFreeBillingService) {
    paperFreeBillingService.getStatus(function(paperFreeBillingResponse) {
      $scope.paperFreeBilling = new PaperFreeBilling($scope, paperFreeBillingResponse);
    });
  }
])  
  .controller("paperFreeBillingController.setStatus", ['$scope', 'paperFreeBillingService',
  function($scope, paperFreeBillingService) {
    $scope.paperFreeBillingSelected = function(paperFree) {
      $scope.$paperFreeBilling = !$scope.paperFreeBilling;
      /* fix for checkbox for IE8.. to be moved to some other place*/
      var checkboxID=document.getElementById('setPaperFreeBilling');
      var customCheckboxName=document.getElementById('checkbox');
      if(checkboxID.checked){
          customCheckboxName.className += ' checkbox-checked';
        }
      else{
          customCheckboxName.className = 'custom-checkbox';
        }   
    }
    $scope.submitPaperFreeBilling = function() {
      $scope.status = 'loading';
      paperFreeBillingService.setStatus(function(paperFreeBillingResponse) {
        $scope.paperFreeBilling = new PaperFreeBilling($scope, paperFreeBillingResponse);
      });
    }

  }
]);
angular.module("desktopBoltonsModule", [])
.controller("boltonsController.getActiveAndPendingRechargeBoltons", ['$scope', 'paygBoltonsService',
    function($scope, paygBoltonsService) {
        paygBoltonsService.getBoltons(function(response) {
            if (response.error) {
                $scope.status = 'error';
            } else {
                $scope.status = 'success';
                $scope.paygBoltons = new DesktopPaygBoltons(response);
            }
        });
    }
]);
angular.module("rewardsModule", ['ngRoute'])
.controller("rewardsController.getRewards", ['$scope', 'rewardsService',
	function($scope, rewardsService) {
		rewardsService.getRewards(function(rewardsResponse) {
			$scope.rewards = new Rewards($scope, rewardsResponse).rewards;
		});
	}
]);
angular.module("tariffDetailsModule", [])
    .controller("tariffController.getDetails", ['$scope', 'tariffDetailsService',
        function($scope, tariffDetailsService) {
            tariffDetailsService.getDetails(function(response) {
                response = response.prepayUserAccount;
                $scope.tariffDetails = new TariffDetails($scope, response);
                if(response.pendingTariff) {
                    $scope.pendingTariffDetails = new PendingTariffDetails($scope, response);
                }
            });
        }
]);
angular.module("topupModule", ['ngRoute'])
.controller("topupController.getHistory", ['$scope', 'topupService',
	function($scope, topupService) {
		topupService.getHistory(function(topupHistoryResponse) {
			$scope.topupHistory = new TopupHistory($scope, topupHistoryResponse);
		});
	}
]);
