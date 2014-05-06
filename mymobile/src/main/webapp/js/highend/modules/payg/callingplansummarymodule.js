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