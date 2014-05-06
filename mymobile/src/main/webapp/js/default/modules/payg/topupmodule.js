angular.module("topupModule", ['ngRoute'])
.controller("topupController.getHistory", ['$scope', 'topupService',
	function($scope, topupService) {
		topupService.getHistory(function(topupHistoryResponse) {
			$scope.topupHistory = new TopupHistory($scope, topupHistoryResponse);
		});
	}
]);