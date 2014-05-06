function PaymentDetails($scope, obj) {
	
	if(obj.pinValidationFailed){
		$scope.pinError = new PinError(obj);
		$scope.status = $scope.pinError.hasExceededMaximumAttempts ? "maxAttemptsError" : "success";
		$scope.view = "validatePin";
		$scope.setFocused = true;
	}else if (obj.error) {
		$scope.status = "error";
	}else{
		$scope.status = "success";
		this.paymentDetails = obj;
		$scope.view = "paymentDetails";
	}	
}

function PinValidationForm(){
	this.pin;
	this.showPinError = false;
	this.pinValid = false;

	this.isPinValid = function(){
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;
	}
}

function PaymentType($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
	}else if(obj.hasExceededMaximumAttempts){
		$scope.status = "maxAttemptsError";
	} else {
		$scope.status = "success";
		this.paymentType = obj.paymentType;
		this.userHasPin = obj.userHasPin;
	}
}


function PinError(obj) {
	this.pinValidationFailed= obj.pinValidationFailed;
	this.hasExceededMaximumAttempts = obj.hasExceededMaximumAttempts;
	this.message = obj.message;
	this.remainingPinAttempts = obj.remainingPinAttempts;
}

