var calculatePercentageUsed = function(unlimited, startingBalance, used) {
    if (unlimited || !startingBalance) {
        return 0;
    }
    else {
        used = used || 0;
        return (used / startingBalance * 100);
    }
}

var getAlertMessage = function(allowanceType, percentageUsed, dataAllowanceType) {
	var alertMessage = {};
	var prop = properties[allowanceType+'allowance'];
	if (percentageUsed >= prop.threshold && percentageUsed < 100) {
        alertMessage.type = "warning";
		alertMessage.text = allowanceType == 'data' ? prop.warningMessage[dataAllowanceType] : prop.warningMessage;
	}
	else if (percentageUsed >= 100) {
        alertMessage.type = "alert";
		alertMessage.text = allowanceType == 'data' ? prop.criticalMessage[dataAllowanceType] : prop.criticalMessage;
	}
	return alertMessage;
}

function Allowance(type, obj) {
	this.type = type;
	
	this.error = obj.error || false;
	if (type == "data") {
		this.isValid = false;
		if (obj.dataAllowanceType && obj.dataAllowanceType != 'OVERAGE_WITH_NO_BUNDLE') {
			this.isValid = true;
			this.dataAllowanceType = obj.dataAllowanceType;
			if (obj.allowance == -1 || 
				obj.dataAllowanceType == 'DATA_UNLIMITED' || 
				obj.dataAllowanceType == 'DAILY_TETHERING' || 
				obj.dataAllowanceType == 'MONTHLY_TETHERING') {
					this.isUnlimited = true;
			}
			else {
				var dataAllowanceType = obj.dataAllowanceType || 'UNKNOWN';
				this.isUnlimited = false;
				this.expiryDate = obj.expiryDate
				this.startingBalance = obj.allowance;
				this.used = obj.used;
				this.remaining = obj.remaining;
				this.percentageUsed = obj.percentageUsed;
				var alertMessage = getAlertMessage(type, this.percentageUsed, dataAllowanceType);
				this.messageType = alertMessage.type;
				this.warningMessage = alertMessage.text;
			}
		}
	}
	else if (type == "minutes") {
		this.expiryDate = obj.expiryDate;
		this.startingBalance = obj.startingBalance;
		this.description=obj.description;
		this.used = obj.used;
		this.remaining = obj.remaining;
		this.isUnlimited = obj.unlimited;
		this.percentageUsed = calculatePercentageUsed(this.isUnlimited, this.startingBalance, this.used);
		var alertMessage = getAlertMessage(type, this.percentageUsed)
		this.messageType = alertMessage.type;
		this.warningMessage = alertMessage.text;
	}else if(type == "messages"){
		this.expiryDate = obj.expiryDate;
		this.startingBalance = obj.startingBalance;
		this.description=obj.description;
		this.used = obj.used;
		this.remaining = obj.remaining;
		this.isUnlimited = obj.unlimited;
		this.percentageUsed = calculatePercentageUsed(this.isUnlimited, this.startingBalance, this.used);
		var alertMessage = getAlertMessage(type, this.percentageUsed)
		this.messageType = alertMessage.type;
		this.warningMessage = alertMessage.text;
	}
}