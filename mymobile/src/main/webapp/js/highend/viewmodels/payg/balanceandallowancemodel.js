function BalanceAndAllowanceSummary(obj, $filter) {
	this.error = obj.error;
	this.accountBalance = obj.accountBalance ? obj.accountBalance.valueInPence : null;
	this.allowanceText = getAllowanceText(obj);
	this.anniversaryDate = obj.anniversaryDate;
	this.topupMessage = "";
	this.imageUrl = "";
	if (obj.currentTariff) {
		if (obj.currentTariff.simplicityNoAllowance) {
			if (this.accountBalance === 0) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityNoAllowance.zeroBalance;
				this.imageUrl = "alert";
			} else if (this.accountBalance <= properties.thresholdBalance) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityNoAllowance.balanceLessThanThreshold;
				this.imageUrl = "warning";
			}
		} else {
			if (obj.currentTariff.pendingRecharge) {
				this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.pendingRecharge;
				this.imageUrl = "alert";
			} else {
				if (obj.currentTariff.inArrears) {
					if (obj.currentTariff.simplicityPaidFor) {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.simplicityPaidFor.inArrears;
						this.imageUrl = "alert";
					} else if (obj.currentTariff.accountStatus == 'ACTIVE') {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.active.inArrears;
						this.imageUrl = "alert";
					}
				} else {
					if (obj.currentTariff.simplicityPaidFor) {
						var warningMessageText = properties.paygBalanceAndAllowanceWarningMessage.simplicityPaidFor.notInArrears;
						var nextPaymentDate = $filter('dateFormatter')(obj.currentTariff.nextPaymentDate);
						this.topupMessage = warningMessageText.replace("<next-payment-date>", nextPaymentDate);
					} else if (obj.currentTariff.accountStatus == 'ACTIVE') {
						this.topupMessage = properties.paygBalanceAndAllowanceWarningMessage.active.notInArrears;
					}
				}
			}
		}
	}
}

function getAllowanceText(obj) {
	if (obj.allowanceText == null || obj.allowanceText == "ERROR" || obj.currentTariff.pendingRecharge
				|| (obj.currentTariff.inArrears && obj.currentTariff.simplicityPaidFor)) {
		return null;
	} else {
		return obj.allowanceText;
	}
}