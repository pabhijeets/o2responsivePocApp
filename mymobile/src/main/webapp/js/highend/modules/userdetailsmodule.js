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

//        $rootScope.desktopSiteRedirectUrl = $scope.app.desktopSiteRedirectUrl +
//                                                    "?disambiguation_id=" + $rootScope.disambiguationId;

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