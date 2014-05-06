function CreatePin($scope, obj) {
	  if (obj.error) {
	    $scope.status = "error";
	    $scope.showCallToAction = false;
	  } else {
	    $scope.showCallToAction = true;
	    $scope.status = "success";
	    this.pinCreated = obj.pinCreated;
	  }

	  

}

function CreatePinState() {
			this.pin = ""
			this.pinValid = false,
			this.showPinError = false,
			this.confirmPin = "",
			this.confirmPinValid = false,
			this.showConfirmPinError = false


		this.validate = function() {
			this.pinValid = /^[0-9]{4}$/.test(this.pin);
			this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
			this.showPinError = !this.pinValid && this.pin.length == 4;
			this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin.length == 4;
		}
}