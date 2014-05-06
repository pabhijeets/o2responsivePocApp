ChangePinView = function(state) {
	if (state === undefined || state != 'form-entry') {
		throw "undefined or unsupported state";
	}
	this.actOnState(state);
}

ChangePinView.prototype = {
	setState: function(state, response) {
		if (state === undefined || !/^form-submit|success|failed|existing-pin-invalid$/.test(state)) {
			throw "undefined or unsupported state";
		}
		this.actOnState(state, response);
	},

	actOnState: function(state, response) {
		switch(state) {
			case "form-entry":
			case "success":
			case "failed":
				this.init();
				break;
			case "existing-pin-invalid":
				this.existingPin = "";
				this.existingPinValid = false;
				this.existingPinFormatValid = false;
				this.showExistingPinFormatError = false;
				this.existingPinErrors = new PinError(response);
				this.setFocusOnExistingPin = true;
				break;
		}
		this.state = state;
	},

	init : function() {
		this.pin = "";
		this.pinValid = false;
		this.showPinError = false;

		this.confirmPin = "";
		this.confirmPinValid = false;
		this.showConfirmPinError = false;

		this.existingPin = "";
		this.existingPinValid = true;
		this.existingPinFormatValid = false;
		this.showExistingPinFormatError = false;
	},

	validate : function() {
		this.existingPinErrors = undefined;
		
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;

		this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
		this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin && this.confirmPin.length == 4;

		this.existingPinFormatValid = /^[0-9]{4}$/.test(this.existingPin);
		this.showExistingPinFormatError = !this.existingPinFormatValid && this.existingPin && this.existingPin.length == 4
		if (this.existingPin && this.existingPin.length > 0) {
			this.existingPinValid = true;
		}
	}
};