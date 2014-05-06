function PendingTariff($scope, obj) {
  if (obj.error) {
    $scope.status = "error";
  } else {
    $scope.status = "success";
    this.boltons = obj.coreDataOrPromotionalBoltOns ? obj.coreDataOrPromotionalBoltOns.concat(obj.boltOnsOtherThanCoreDataAndPromotional) : obj.boltOnsOtherThanCoreDataAndPromotional;
    this.startDate = obj.startDate;
    this.endDate = obj.endDate;
    this.monthlyFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : undefined;
    this.tariffName = obj.tariffName;
    this.minimumTermInMonths = obj.minimumTermInMonths;
    this.description = obj.tariffDescription;
    this.cancelToken = obj.cancelToken;
  }


  $scope.getBoltonBillingInterval = function(interval) {
    if(interval ==='MONTHLY') {
      return 'per month';
    } else if(interval==='ONE_OFF') {
      return 'one-off';
    }
  }
}
