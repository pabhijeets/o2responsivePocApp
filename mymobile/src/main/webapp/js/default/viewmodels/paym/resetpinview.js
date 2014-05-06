ResetPinView = function(state) {
	if (state === undefined || state != 'form-entry') {
		throw "undefined or unsupported state";
	}
	this.actOnState(state);
}

ResetPinView.prototype = {
	setRemainingAttempts: function(value) {
		this.remainingAttempts = value;
	},

	setState: function(state) {
		if (state === undefined || !/^form-submit|success|failed|payment-number-invalid|payment-details-loacked$/.test(state)) {
			throw "undefined or unsupported state";
		}
		this.actOnState(state);
	},

	actOnState: function(state) {
		switch(state) {
			case "form-entry":
			case "success":
			case "failed":
			case "payment-details-loacked":
				this.init();
				break;
			case "payment-number-invalid":
				this.paymentNumber = "";
				this.paymentNumberValid = false;
				this.paymentNumberFormatValid = false;
				this.showPaymentNumberFormatError = false;
				this.setFocusOnPaymentNumber = true;
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

		this.paymentNumber = "";
		this.paymentNumberValid = true;
		this.paymentNumberFormatValid = false;
		this.showPaymentNumberFormatError = false;

		this.remainingAttempts = 3;
	},

	validate : function() {
		this.pinValid = /^[0-9]{4}$/.test(this.pin);
		this.showPinError = !this.pinValid && this.pin && this.pin.length == 4;

		this.confirmPinValid = this.pinValid && this.pin === this.confirmPin;
		this.showConfirmPinError = this.pinValid && !this.confirmPinValid && this.confirmPin && this.confirmPin.length == 4;

		this.paymentNumberFormatValid = /^[0-9]{4}$/.test(this.paymentNumber);
		this.showPaymentNumberFormatError = !this.paymentNumberFormatValid && this.paymentNumber && this.paymentNumber.length == 4
		if (this.paymentNumber && this.paymentNumber.length > 0) {
			this.paymentNumberValid = true;
		}
	}
};