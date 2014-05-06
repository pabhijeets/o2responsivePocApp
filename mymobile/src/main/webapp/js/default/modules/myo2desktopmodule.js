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
    $rootScope.disambiguationId = getParameterByName('disambiguation_id');
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