function CreditCardDetails() {
	this.cardType;
	this.cardNumber;
	this.expiryMonth;
	this.expiryYear;
	this.pin;
}

function CreditCardDetailsPostForm(creditCardDetails) {
	this.cardType = creditCardDetails.cardType;
	this.cardNumber = creditCardDetails.cardNumber;
	this.expiryMonth = creditCardDetails.expiryMonth.month;
	this.lastTwoDigitsOfExpiryYear = creditCardDetails.expiryYear;
	this.pin = creditCardDetails.pin;
}

function CreditCard($filter){
	this.creditCardDetails = new CreditCardDetails();
	this.validations = new Validations();
	var currentYear = parseInt($filter('date')(new Date(), 'yy'));
	var currentMonth = parseInt($filter('date')(new Date(), 'MM'));

	this.months = getMonthValues();
	this.years = getYearsFromCurrentYear(currentYear, 10);
	this.cardTypes = ['VISA', 'Mastercard'];

	this.validateCardType = function(){
		if($.inArray(this.creditCardDetails.cardType, this.cardTypes) > -1){
			this.validations.isCardTypeValid = true;
			this.validations.showCardTypeError = false;
		}else{
			this.validations.isCardTypeValid = false;
			this.validations.showCardTypeError = true; 
		}
		this.validations.showCardNumberError =false;
	}

	//Validate the credit card number
	this.validateNumber=function() {
		if (!this.creditCardDetails.cardNumber) {
			this.validations.isCreditCardNumberValid = false;
			this.validations.showCardNumberError = !this.validations.isCreditCardNumberValid;
		} else {
			if(this.creditCardDetails.cardType == 'VISA'){
				this.validatePattern(/^4([0-9]{12}|[0-9]{15})$/);
			} else if(this.creditCardDetails.cardType == 'Mastercard'){
				this.validatePattern(/^5[0-9]{15}$/);
			}
		}
	}


	this.validatePattern = function(pattern) {
			this.validations.isCreditCardNumberValid = pattern.test(this.creditCardDetails.cardNumber);
			this.validations.showCardNumberError = !this.validations.isCreditCardNumberValid;
	} 

	//Check if selected year is current year and set months accordingly
	this.checkPastDate = function() {
		if(!this.creditCardDetails.expiryMonth ||!this.creditCardDetails.expiryYear || this.creditCardDetails.expiryYear == currentYear && this.creditCardDetails.expiryMonth.month < currentMonth) {
			this.validations.isExpiryDateValid = false;
		}else{
			this.validations.isExpiryDateValid = true;
		}
		this.validations.showExpiryDateError = !this.validations.isExpiryDateValid;
	}

	this.validatePin = function() {
		this.validations.isPinValid = this.creditCardDetails.pin && /^[0-9]{4}$/.test(this.creditCardDetails.pin);
		this.validations.showPinError = !this.validations.isPinValid;				
	}

	this.validateAll  = function() {
		this.pinError = undefined;
		this.validateCardType();
		this.validateNumber();
		this.checkPastDate();
		this.validatePin();
		this.setFocus();
	}

	this.setFocus = function (){
		this.setFocusOnCreditCardNumber = !this.validations.isCreditCardNumberValid;
		this.setFocusOnPin = !this.setFocusOnCreditCardNumber && !this.validations.isPinValid;

	}

	this.handlePostResponse = function($scope, response){

		if(response.pinValidationFailed){
			this.pinError = new PinError(response);
			$scope.status = this.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "form";
			$scope.setEnterPinFocused = true;
			this.creditCardDetails.pin = undefined;
			this.setFocusOnPin = true;
		}else if(response.invalidCreditCardNumber){
			$scope.invalidCreditCardNumber =true;
			$scope.status = 'form';
			this.creditCardDetails.pin = undefined;
			this.setFocusOnCreditCardNumber = true;
		}else if(response.error) {
			$scope.status = 'error';
		}else if(response=="true") {
			$scope.status = 'success';
		}
	}
}

function Validations(){
	this.isCreditCardNumberValid = false;
	this.showCardNumberError = false;
	this.isCardTypeValid = false;
	this.isExpiryDateValid= false;
	this.showCardTypeError = false;
	this.showExpiryDateError = false;
	this.showPinError = false;
	this.isPinValid = false;
	
}


function Month(month) {
	this.month = month;

	if(month<10) {
		this.monthText = "0" + month;
	}else {
		this.monthText = month.toString();
	}
}

function getMonthValues() {
	var months = [];
	for(month = 1; month <= 12 ; month++) {
		months.push(new Month(month));
	}
	return months;
}

function getYearsFromCurrentYear(currentYear, noOfYears){
	var years = [];
	for(year = currentYear; year <= currentYear + noOfYears ; year++) {
		years.push(year);
	}
	return years;
}

