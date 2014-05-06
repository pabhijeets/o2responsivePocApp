angular.module("upgradeEligibilityService", [])
.service("upgradeEligibilityService", ['$http', function($http) {
    var upgradeEligibilityService = {};

    upgradeEligibilityService.getUpgradeEligibility = function(callback) {
//        $http.get(properties.serviceEndpoints.paym.getUpgradeEligibility)
//        .success(function(successResponse) {
//          callback(successResponse);
//        })
//        .error(function(errorResponse) {
//          callback({error: properties.errorMessage});
//        });
    	callback({"tariffFamily":"24M CCA","tariffClassification":"VOICE","paidUpgradeOption":null,"freeUpgradeOption":null,"eligibilityFailureReasons":[],"inTreatment":false,"simSwapped":false,"orderInProgress":false,"serviceBarred":false,"tariffSupportsUpgrade":true,"upgradeEntitlementServiceNotAvailable":false,"eligibleToday":true,"freeUpgradeToday":true});
    }

    return upgradeEligibilityService;
}]);