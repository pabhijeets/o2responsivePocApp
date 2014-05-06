function DesktopPaygBoltons(boltons) {
	this.dataBoltons = [];
	this.otherBoltons = [];
	this.dataBoltOnsCount = 0;
	this.otherBoltOnsCount = 0;
    this.hasPendingRechargeBolton = false;
	for (var count = 0; count < boltons.length; count++) {
        var bolton = boltons[count]
        if (bolton.status == 'ACTIVE' || bolton.status == 'PENDING_RECHARGE') {
            if (bolton.boltOnCategory == "WAP") {
                this.dataBoltons.push(new DesktopPaygBolton(boltons[count]));
                this.dataBoltOnsCount++;
            } else {
                this.otherBoltons.push(new DesktopPaygBolton(boltons[count]));
                this.otherBoltOnsCount++;
            }
        }
        if(!this.hasPendingRechargeBolton) {
            this.hasPendingRechargeBolton = (bolton.status == 'PENDING_RECHARGE')? true : false;
        }

  	}
}

function DesktopPaygBolton(obj) {

	var getBillingInterval = function (billingInterval) {
		if(billingInterval == "MONTHLY") {
			return "per month";
		} else if(billingInterval == "ONE_OFF") {
			return "one-off";
		}
	};

	var getCost = function(billingInterval, monthlyCost, oneOffCost) {
		if (billingInterval == "MONTHLY") {
			return monthlyCost ? monthlyCost.valueInPence : null;
		} else if (billingInterval == "ONE_OFF") {
			return oneOffCost ? oneOffCost.valueInPence : null;
		}
	};

	this.name = obj.name;
	this.status = obj.status;
	this.billingInterval = getBillingInterval(obj.billingInterval);
	this.boltOnFee = getCost(obj.billingInterval, obj.monthlyCost, obj.oneOffCost);
}