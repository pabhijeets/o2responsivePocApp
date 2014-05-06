var calculatePercentageUsed = function(unlimited, startingBalance, used) {
	if (unlimited || !startingBalance) {
		return 0;
	} else {
		used = used || 0;
		return (used / startingBalance * 100);
	}
}

angular.module("allowancesService", []).service("allowancesService",
		[ '$http', function($http) {
			var allowancesService = {};

			allowancesService.getDataAllowance = function(callback) {
				// $http.get(properties.serviceEndpoints.paym.getDataAllowances)
				// .success(function(successResponse) {
				// console.log(JSON.stringify(successResponse));
				// successResponse.dataAllowanceSummary =
				// successResponse.dataAllowanceSummary || {};
				// successResponse.dataAllowanceSummary.dataAllowanceType =
				// successResponse.dataAllowanceType;
				// callback(successResponse.dataAllowanceSummary);
				// })
				// .error(function(errorResponse) {
				// callback({error: true});
				// });
				//callback({"dataAllowanceType":"CAPPED","dataAllowanceSummary":{"allowance":51200,"lastUpdated":1301408868000,"used":51200,"remaining":0,"dataThresholdType":"DOMESTIC_MONTHLY","percentageUsed":100,"expiryDate":1301855400000,"startDate":1299263400000}});
				callback({"allowance":51200,"lastUpdated":1301408868000,"used":51200,"remaining":0,"dataThresholdType":"DOMESTIC_MONTHLY","percentageUsed":100,"expiryDate":1301855400000,"startDate":1299263400000});
			};

			allowancesService.getMinutesAllowance = function(callback) {
				// $http.get(properties.serviceEndpoints.paym.getMinutesAllowances)
				// .success(function(successResponse) {
				// callback(successResponse.allowanceDetails);
				// })
				// .error(function(errorResponse) {
				// callback({error: true});
				// })
				
				callback(
						[{"description":"Anytime, any network minutes","orderIndex":20,"restrictionCategory":"UNRESTRICTED","startingBalance":18000.0,"used":14400.0,"remaining":3600.0,"unlimited":false,"level":"ACCOUNT","expiryDate":1413138600000}]
				);
			}

			allowancesService.getMessagesAllowance = function(callback) {
				// $http.get(properties.serviceEndpoints.paym.getMessagesAllowances)
				// .success(function(successResponse) {
				// callback(successResponse.allowanceDetails);
				// })
				// .error(function(errorResponse) {
				// callback({error: true});
				// })
				callback( [{"description":"Text messages","orderIndex":20,"restrictionCategory":"SMS","startingBalance":1000.0,"used":1000.0,"remaining":0.0,"unlimited":false,"level":"ACCOUNT","expiryDate":1413138600000},{"description":"50 Picture Messages","orderIndex":50,"restrictionCategory":null,"startingBalance":50.0,"used":40.0,"remaining":10.0,"unlimited":false,"level":"ACCOUNT","expiryDate":1413138600000}]
				);
			}
			return allowancesService;
		} ]);