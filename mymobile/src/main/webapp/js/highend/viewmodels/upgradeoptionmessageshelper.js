function UpgradeOptionMessagesHelper($filter, isCCA) {

    this.constructMessagesForUpgradeType = function(upgradeEligibility, upgradeType) {
        var upgradeMessages = []
        var displayUpgradeShop = false;

        if(this.contains(upgradeEligibility.tariffClassification, 'leasing')) {
            upgradeMessages = properties.upgradeEligibility[upgradeType].LEASING
        } else if (isCCA) {
            if (this.contains(upgradeEligibility.tariffClassification, "staff") || this.contains(upgradeEligibility.tariffFamily, "staff")) {
                upgradeMessages = properties.upgradeEligibility[upgradeType].CCA_STAFF
            } else {
                displayUpgradeShop = true;
                upgradeMessages = properties.upgradeEligibility[upgradeType].CCA
            }
        } else {
            if (this.contains(upgradeEligibility.tariffClassification, "staff") || this.contains(upgradeEligibility.tariffFamily, "staff")) {
                upgradeMessages = properties.upgradeEligibility[upgradeType].HANDSET_SIMO_STAFF
            } else {
                displayUpgradeShop = true;
                upgradeMessages = properties.upgradeEligibility[upgradeType].HANDSET_SIMO
            }
        }
        return { messages: upgradeMessages, displayUpgradeShop: displayUpgradeShop};
    }

    this.constructMessages = function (upgradeEligibility) {
        if(upgradeEligibility.isEligibleToday) {
            if(upgradeEligibility.isFreeUpgradeToday) {
                return this.constructMessagesForUpgradeType(upgradeEligibility, "free");
            } else if (upgradeEligibility.paidUpgradeOption && upgradeEligibility.freeUpgradeOption) {
                return this.constructMessagesForUpgradeType(upgradeEligibility, "paid");
            } else {
                return { messages: [properties.upgradeEligibility.noUpgrade.DEFAULT], displayUpgradeShop: false};
            }
        } else {
            return this.constructMessageForNoUpgrade(upgradeEligibility);
        }
    }

    this.constructMessageForNoUpgrade=function(upgradeEligibility){

        var upgradeMessages = []
        var displayUpgradeShop = false;

        if(upgradeEligibility.tariffClassification == 'MBB'){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.MBB);
        }else if(upgradeEligibility.isInTreatment){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_IN_TREATMENT);
        }else if(upgradeEligibility.isSimSwapped){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_SIM_SWAPPED);
        }else if(upgradeEligibility.isOrderInProgress){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_ORDER_IN_PROGRESS);
        }else if(upgradeEligibility.freeUpgradeOption && upgradeEligibility.freeUpgradeOption.eligibilityTime == "FUTURE"){
            var upgradeDate = $filter("dateFormatter")(upgradeEligibility.freeUpgradeOption.eligibilityDate);
            var upgradeDateMessage = "You'll be able to upgrade on "+upgradeDate + ".";
            upgradeMessages.push(upgradeDateMessage);
        }else if(upgradeEligibility.isServiceBarred){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.IS_SERVICE_BARRED);
        }else if(!upgradeEligibility.isTariffSupportsUpgrade){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.TARIFF_DOES_NOT_SUPPORT_UPGRADE);
        }else if(upgradeEligibility.isUgradeEntitlementServiceNotAvailable){
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.UPGRADE_ENTITLEMENT_SERVICE_UNAVAILABLE);
        }else{
            upgradeMessages.push(properties.upgradeEligibility.noUpgrade.DEFAULT);
        }
        return { messages: upgradeMessages, displayUpgradeShop: displayUpgradeShop};
    }

    this.contains = function (source, searchText) {
        return  (source.toLowerCase().indexOf(searchText) != -1);
    }
}