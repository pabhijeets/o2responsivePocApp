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