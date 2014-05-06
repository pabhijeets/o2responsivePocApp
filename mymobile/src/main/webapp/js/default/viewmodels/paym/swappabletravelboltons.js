function SwappableTravelBolton($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
    $scope.showCallToAction = false;
  } else {
    $scope.showCallToAction = true;
    $scope.status = "success";
    this.swappableBoltOnsList = obj;
    this.swappableTravelBolton = filter(this.swappableBoltOnsList, function(obj){
      	return obj.id === "9003"
      });
    this.hasSwappableTravelBolton = this.swappableTravelBolton ? true : false;
  }
}