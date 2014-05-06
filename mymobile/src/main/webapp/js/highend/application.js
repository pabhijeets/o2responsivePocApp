//The main myo2responsive angular application
angular.module("myo2", [
        'ngRoute',
        'ngSanitize',
        'userDetailsService',
        'navigationModule',
        'userDetailsModule',
        
        'payMonthlyTariffService',
        'myLatestBillDetailsService',
        'recentChargesService',
        'allowancesService',
        'myBoltonsService',
        'addBoltonsService',
        'upgradeEligibilityService',
        'myPhonePlanService',
        
      
        'widgetModule',
        'callingPlanModule',
        'myAllowancesModule',
        'allowanceDetailsModule',
        'myLatestBillModule',
        'myRecentChargesModule',
        'myTariffDetailsModule',
        'myBoltonsModule',
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
                templateUrl: "templates/highend/mymobileindex.html"
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
//                    //var disambiguation_id = $rootScope.disambiguationId;
////                    if(disambiguation_id != null  &&)
//                    	if((config.url.indexOf(".svg") == -1) ) {
//                        config.url = config.url ;
//                    }
//                    return config || $q.when(config);
                	return config;
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