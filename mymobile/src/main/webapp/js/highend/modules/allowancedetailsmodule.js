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