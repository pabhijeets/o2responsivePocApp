angular.module("userDetailsService", [])
.service("userDetailsService", ['$http', function($http) {
	var userDetailsService = {};

	userDetailsService.getUserDetails = function(callback) {
		callback({"accountId":"447011111021","monthlyUser":true,"cca":false,"registeredMobileNumber":{"value":"07011111021"}});
	}

	userDetailsService.getMobileNumbers = function(callback) {
		$http.get(defaultProperties.serviceEndpoints.common.mobileNumbers)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	}

	userDetailsService.getBillingAddress = function(callback) {
		$http.get(defaultProperties.serviceEndpoints.common.billingAddress)
		.success(function(successResponse) {
			callback(successResponse);
		})
		.error(function(errorResponse) {
			callback({error: true});
		});
	}
	
	return userDetailsService;
}]);