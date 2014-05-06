angular.module("myOrdersModule", [])
.controller("myOrdersController.getRecentOrders", ['$scope', 'myOrdersService', 
	function($scope, myOrdersService) {
		myOrdersService.getOrders(function(myOrdersResponse) {
			$scope.myRecentOrders = new MyRecentOrders($scope, myOrdersResponse);
		});
	}
]);