function PendingTariffDetails($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
    } else {
        $scope.status = "success";
        this.name = obj.pendingTariff ? obj.pendingTariff.tariffName : null;
        this.description = obj.pendingTariff ? obj.pendingTariff.description : null;
        this.status = "To be added on anniversary date";
        this.anniversaryDate = obj.anniversaryDate;
        this.startDate = obj.pendingTariff.startDate;
        this.startDateWithinAMonthFromToday = obj.pendingTariff.startDateWithinAMonthFromToday;
    }
}