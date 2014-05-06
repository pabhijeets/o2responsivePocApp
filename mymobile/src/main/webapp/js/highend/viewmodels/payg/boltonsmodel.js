function PaygBoltons(boltons) {
	this.dataBoltons = [];
	this.otherBoltons = [];
	this.dataBoltOnsCount = 0;
	this.otherBoltOnsCount = 0;
	this.dataAndOtherBoltons = [];
	this.dataAndOtherBoltonsCount = 0;
	for (var count = 0; count < boltons.length; count++) {
    	if (boltons[count].boltOnCategory == "WAP") {
      		this.dataBoltons.push(new PaygBolton(boltons[count]));
      		this.dataBoltOnsCount++;
    	} else {
      		this.otherBoltons.push(new PaygBolton(boltons[count]));
      		this.otherBoltOnsCount++;
    	}
    	this.dataAndOtherBoltons.push(new PaygBolton(boltons[count]));
    	this.dataAndOtherBoltonsCount++;
  	}
  	this.groupedDataAndOtherBoltons = groupBy(this.dataAndOtherBoltons, "categoryText");
  	
}


function PaygBolton(obj) {

	var getBillingInterval = function (billingInterval) {
		if(billingInterval == "MONTHLY") {
			return "per month";
		} else if(billingInterval == "ONE_OFF") {
			return "one-off";
		}
	};

	var getBoltOnStatus = function(status, hasPendingPeriodicPayment) {
		var statusKey = status
		if ((status == "PENDING_ADDITION" || status == "PENDING_REMOVAL") && hasPendingPeriodicPayment) {
			statusKey += "_PERIODIC_PAYMENT_DUE";
		}
		return properties.paygboltons.statusText[statusKey];
	};

	var getCost = function(billingInterval, monthlyCost, oneOffCost) {
		if (billingInterval == "MONTHLY") {
			return monthlyCost ? monthlyCost.valueInPence : null;
		} else if (billingInterval == "ONE_OFF") {
			return oneOffCost ? oneOffCost.valueInPence : null;
		}
	};

	var getAllowanceRemainingText = function(obj) {
		var allowanceText = properties.paygboltons.allowanceText.NOT_APPLICABLE;
		if (obj.status == 'ACTIVE') {
			if (obj.blackBerryRoamingBoltOn) {
				if (obj.europeRemainingAllowance && obj.restOfWorldRemainingAllowance) {
					allowanceText = properties.paygboltons.allowanceText.BLACKBERRY_DATA_ROAMING_VALID
										.replace('<EU>', obj.europeRemainingAllowance)
										.replace('<ROW>', obj.restOfWorldRemainingAllowance);
				}
				else
					allowanceText = properties.paygboltons.allowanceText.BLACKBERRY_DATA_ROAMING_INVALID;
			} else if (obj.allowanceText && !obj.allowanceText.match(/ERR/)) {
				allowanceText = obj.allowanceText;
			}
		} else if (obj.status == 'PENDING_RECHARGE') {
			allowanceText = properties.paygboltons.allowanceText.PENDING_RECHARGE;
		}
		return allowanceText;
	};

	this.name = obj.name;
	this.status = getBoltOnStatus(obj.status, obj.hasPendingPeriodicPayment);
	this.billingInterval = getBillingInterval(obj.billingInterval);
	this.description = obj.description;
	this.anniversaryDate = obj.anniversaryDate;
	this.boltOnFee = getCost(obj.billingInterval, obj.monthlyCost, obj.oneOffCost);
	this.allowanceRemainingText = getAllowanceRemainingText(obj);
	this.boltOnCategory = obj.boltOnCategory;
	var today = new Date();
	today.setHours(0,0,0,0);
	this.isExpiryDateIsPastDate = obj.endDate ? (obj.status == 'PENDING_REMOVAL' && today > obj.endDate) : false;
	this.categoryText = getDisplaybleCategoryText(obj.boltOnCategory);
	if(obj.hasSubscriberDataAllowanceAllowance == true && obj.blackBerryRoamingBoltOn == true){
		this.goingAbroad = {caption : "Going Abroad", url : "http://international.o2.co.uk/internationaltariffs/travelling_abroad"}
	}
	if(obj.holdConfigurablePostcode){
		this.manageAction = {caption : "Manage postcode", url : "payandgo/configurepostcode?boltOnId=" + obj.id};
	}else if(obj.holdConfigurablePhoneNumbers){
		this.manageAction = {caption : "Manage my numbers", url : "payandgo/configureo2numbers?boltOnId=" + obj.id};
	}else if(obj.boltOnCategory == "FAMILY"){
		this.manageAction = {caption : "Manage Family", url : "family"};
	}else if(obj.boltOnCategory == "INTFAV"){
		this.manageAction = {caption : "Manage my numbers", extUrl : "https://if.o2.co.uk/templates/LoginStep1.aspx"};
	}
	
	if(obj.billingInterval == "MONTHLY" && (obj.status == 'PENDING_RECHARGE' || obj.status == 'ACTIVE')){
		this.action = {caption : "Remove", url : "payandgo/mytariffandboltons/confirmremovebolton?boltOnId=" + obj.id};
	}
}

function getDisplaybleCategoryText(category) {
  var CategoryTextMap = {
    "GENERAL"	: "Additional Bolt Ons",
    "LANDLINES"	: "Additional Bolt Ons",
    "YOURO2NOS"	: "Additional Bolt Ons",
    "WAP"		: "Web",
    "BBROAM" 	: "BlackBerry",
    "BBBOLTON"	: "BlackBerry",
	"FAMILY"	: "Your Family",
	"INTL"		: "Calling abroad from the UK",
	"INTFAV"	: "Calling abroad from the UK",
	"HOME"		: "O2 Home",
	"MSG"		: "Messaging",
	"TRAVELOFF"	: "Using your phone abroad",
	"TRAVEL"	: "Using your phone abroad",
	"EUROPE"	: "Using your phone abroad" 
  }
  return CategoryTextMap[category] ? CategoryTextMap[category] : category; 
}