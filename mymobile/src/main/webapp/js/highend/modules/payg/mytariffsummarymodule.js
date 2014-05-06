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