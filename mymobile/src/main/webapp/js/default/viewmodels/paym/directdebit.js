function DirectDebit() {
	//Input fields
	this.form = new Object();
	this.form.accountNumber;
    this.form.sortCodeFirstPart;
    this.form.sortCodeSecondPart;
    this.form.sortCodeThirdPart;
    this.form.pin;


    //flags to toggle error messages and button
	this.accountNumberFormatValid = true;
	this.sortCodeValid = true;
	this.pinValid = true;
	this.invalidAccountNumber = false;
	this.saveDisabled = false;

    this.validateDirectDebitForm = function() {

    	this.pinError = undefined;

		//Account number validations
		var accountNumberPattern = /^[0-9]{8,9}$/;
		this.accountNumberFormatValid = accountNumberPattern.test(this.form.accountNumber);

		//Sort code validations
		var sortCodePattern = /^[0-9]{2}$/;
		this.sortCodeValid = sortCodePattern.test(this.form.sortCodeFirstPart) && sortCodePattern.test(this.form.sortCodeSecondPart) && sortCodePattern.test(this.form.sortCodeThirdPart);

		//Pin validations
		var pinPattern = /^[0-9]{4}$/;
		this.pinValid = pinPattern.test(this.form.pin);
		
		this.saveDisabled = !(this.accountNumberFormatValid && this.sortCodeValid && this.pinValid);

		//set focus on correct field

		this.setFocusOnAccountNumber = !this.accountNumberFormatValid;
		this.setFocusOnSortCode = !this.setFocusOnAccountNumber && !this.sortCodeValid;
		this.setFocusOnPin = !this.setFocusOnAccountNumber && !this.setFocusOnSortCode && !this.pinValid;
	}

	this.handleSortCodeFocusForFirstField = function(){
		if(this.form.sortCodeFirstPart.length == 2){
			this.setFocusOnSecondSortCode = true;
			this.setFocusOnThirdSortCode = false;
		}
	}

	this.handleSortCodeFocusForSecondField = function(){
		if(this.form.sortCodeSecondPart.length == 2){
			this.setFocusOnSecondSortCode = false;
			this.setFocusOnThirdSortCode = true;
		}
	}

	this.handlePostResponse = function($scope, response){
		if (response.pinValidationFailed){
			this.pinError = new PinError(response);
			$scope.status = this.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "form";
			this.form.pin = "";
			this.setFocusOnPin = true;
		}else if(response.invalidAccountNumber){
			this.invalidAccountNumber = true;
			this.form.pin = "";
			this.setFocusOnAccountNumber = true;
			$scope.status = 'form';
		} else if (response.error) {
			$scope.status = 'error';
		} else if (response == "true") {
			$scope.status = 'success';
		}
	}
}
