function PaperFreeBilling($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
    $scope.showCallToAction = false;
  } else {
    $scope.showCallToAction = true;
    $scope.status = "success";
    this.isPaperFreeBilling = obj.status;
  }
}