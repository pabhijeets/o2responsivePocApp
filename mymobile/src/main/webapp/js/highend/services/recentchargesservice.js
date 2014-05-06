angular.module("recentChargesService", [])
    .service("recentChargesService", ['$http', function($http) {
        var recentChargesService = {};

        recentChargesService.getRecentCharges = function(callback) {
//            $http.get(properties.serviceEndpoints.paym.getRecentCharges)
//                .success(function(successResponse) {
//                    callback(successResponse);
//                })
//                .error(function(errorResponse) {
//                    callback({error: properties.errorMessage});
//                });
            callback({"voiceCharge":{"valueInPence":32744},"messageCharge":{"valueInPence":2700},"dataCharge":{"valueInPence":8500},"internationalCharge":{"valueInPence":1000},"otherCharge":{"valueInPence":1000},"directToBillCharge":{"valueInPence":-6500},"totalCharge":{"valueInPence":39444},"nextBillDate":1351621800000,"userHasBeenBilledBefore":true});
        };

        return recentChargesService;
}]);