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