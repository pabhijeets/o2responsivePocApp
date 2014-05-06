angular.module("myPhonePlanModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/phoneplan',
            {
                controller: "myPhonePlanController.getDetails",
                templateUrl: "templates/highend/myphoneplanpage.html"
            }
        );
	}
])
.controller("myPhonePlanController.getDetails", ['$scope', 'myPhonePlanService',
	function($scope, myPhonePlanService) {
		myPhonePlanService.getDetails(function(phonePlanResponse) {
			$scope.myPhonePlan = new MyPhonePlan($scope, phonePlanResponse);
		});
	}
]);