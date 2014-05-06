function SwappableO2TravelBolton($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
        return;
    } else {
        $scope.status = "success";
    }

    this.name = obj.name;
    this.id = obj.id;
    this.description = obj.description;
    this.monthlyFee = (obj.monthlyFee)?obj.monthlyFee:null;
}