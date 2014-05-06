function TariffDetail(obj) {
	this.error = obj.error;

	if(obj.basicContract){
	this.accountNumber = obj.basicContract.accountNumber;
	this.endDate = obj.basicContract.endDate;
	this.minimumTermInMonths = obj.basicContract.minimumTermInMonths;
	this.tariffId = obj.basicContract.tariffId;
	this.tariffName = obj.basicContract.tariffName;
	this.startDate = obj.basicContract.startDate;
	this.monthlyFee = obj.basicContract.monthlyFee ? obj.basicContract.monthlyFee.valueInPence : undefined;
	this.tariffStartDate = obj.basicContract.tariffStartDate;
	this.description = obj.basicContract.description;
	this.tariffFamily = obj.basicContract.tariffFamily;
	this.BillingInterval = obj.basicContract.BillingInterval;
	this.leased = obj.basicContract.leased;
	this.mobileBroadBand = obj.basicContract.mobileBroadBand;
	this.hasCoreDataBolton = obj.hasCoreDataBolton;
	/*this.is4gcustomer = obj.4GCustomer*/	
	}
}

