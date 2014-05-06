function BillingAddressView($scope, obj) {
	if (obj.error) {
		this.status = 'error';
	} else {		
		this.houseNumber = obj.houseNumber;
		this.houseName = obj.houseName;
		this.line1 = obj.line1;
		this.line2 = obj.line2;
		this.town = obj.town;
		this.county = obj.county;
		this.postcode = obj.postcode;
		this.status = 'success';
	}
	return this;
}