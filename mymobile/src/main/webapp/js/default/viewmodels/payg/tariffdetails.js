function TariffDetails($scope, obj) {
    var prop = defaultProperties.widgets.payg.tariffdetails;

    var getStatus = function(tariff) {
        if(tariff.accountStatus == "ACTIVE" || tariff.accountStatus == "PENDING_RECHARGE") {
            return prop.status[tariff.accountStatus];
        }
        if(tariff.accountStatus == "PENDING_REMOVAL") {
            if(tariff.nextPaymentDate == null) {
                return prop.status["OTHER"];
            }
            if(tariff.nextPaymentDateIsInPast) {
                return prop.status[tariff.accountStatus].nextPaymentDateInPast;
            }
            return prop.status[tariff.accountStatus].nextPaymentDateNotInPast;
        }
        return prop.status["OTHER"];
    }

    if (obj.error) {
        $scope.status = "error";
    } else {
        $scope.status = "success";
        this.name = obj.currentTariff ? obj.currentTariff.tariffName : null;
        this.description = obj.currentTariff ? obj.currentTariff.description : null;
        this.status = obj.currentTariff ? getStatus(obj.currentTariff): null;
        this.allowanceText = getAllowanceText(obj);
        this.anniversaryDate = obj.anniversaryDate;
        this.canHoldConfigurablePostcode = obj.currentTariff.maxParametersAllowed > 0;
    }
}