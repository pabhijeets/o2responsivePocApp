angular.module("securityPinService", [])
.service("securityPinService", ['$http', function($http) {
	var securityPinService = {};

	securityPinService.createPin = function(pin, callback) {
		$http.post(defaultProperties.serviceEndpoints.paym.createPin, pin)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	};

	securityPinService.resetPin = function(newPin, paymentNumber, callback) {
		$http.put(defaultProperties.serviceEndpoints.paym.resetPin, {'newPin': newPin, 'paymentNumber': paymentNumber})
		.success(function(successResponse) {
			callback('success');
		})
		.error(function(errorResponse, status) {
			if (status == 412)
				callback('payment-number-invalid', errorResponse.remainingAttempts);
			else if (status == 403)
				callback('payment-details-loacked');
			else
				callback('failed');
		});
	}

	securityPinService.changePin = function(newPin, existingPin, callback) {
		$http.put(defaultProperties.serviceEndpoints.paym.changePin, {'newPin': newPin, 'existingPin': existingPin})
		.success(function(successResponse) {
			callback('success', successResponse);	
		})
		.error(function(errorResponse, status) {
			if(status == 403){
				callback('existing-pin-invalid', errorResponse);	
			}else{
				callback('failed', errorResponse)	
			}
			
		});
	}

	return securityPinService;
}]);