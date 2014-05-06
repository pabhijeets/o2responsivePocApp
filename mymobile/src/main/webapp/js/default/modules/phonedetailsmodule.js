angular.module("phoneDetailsModule", ['ngRoute'])
.controller("phoneDetailsController.getSummary", ['$scope', 'phoneDetailsService',
	function($scope, phoneDetailsService) {
		phoneDetailsService.getSummary(function(phoneDetailsResponse) {
			$scope.phoneDetails = new PhoneDetails($scope, phoneDetailsResponse);
		});
	}
]);