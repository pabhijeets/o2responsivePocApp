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