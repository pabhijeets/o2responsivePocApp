angular.module("paperFreeBillingService", [])
.service("paperFreeBillingService", ['$http', function($http) {
    var paperFreeBillingService = {};

    paperFreeBillingService.getStatus = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getPaperFreeBilling)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    paperFreeBillingService.setStatus = function(callback) {
        $http.post(defaultProperties.serviceEndpoints.paym.setPaperFreeBilling, {paperFreeBills: true}, {headers: { 'Content-Type': 'application/json' }})
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return paperFreeBillingService;
}]);