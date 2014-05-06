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