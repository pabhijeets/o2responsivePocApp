function MyRecentOrders($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.orders = obj.current;
	}
}