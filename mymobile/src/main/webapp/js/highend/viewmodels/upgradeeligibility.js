function UpgradeEligibility(obj) {
    this.isEligibleToday = obj.eligibleToday;

    this.isFreeUpgradeToday = obj.freeUpgradeToday;

    this.freeUpgradeOption = obj.freeUpgradeOption;

    this.paidUpgradeOption = obj.paidUpgradeOption;

    this.tariffClassification = obj.tariffClassification;

    this.tariffFamily = obj.tariffFamily;

    this.eligibilityFailureReasons = obj.eligibilityFailureReasons;

    this.error = obj.error;

    this.isInTreatment = obj.inTreatment;

    this.isSimSwapped =  obj.simSwapped;

    this.isOrderInProgress = obj.orderInProgress;

    this.isServiceBarred = obj.serviceBarred;

    this.isTariffSupportsUpgrade = obj.tariffSupportsUpgrade;

    this.isUgradeEntitlementServiceNotAvailable = obj.upgradeEntitlementServiceNotAvailable;

    if(obj.tariffClassification && obj.tariffClassification=="MBB"){
        this.isMBBUser = true;
    }
    
}
