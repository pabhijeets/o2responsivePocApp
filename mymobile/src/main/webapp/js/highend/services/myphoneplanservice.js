angular.module("myPhonePlanService", [])
.service("myPhonePlanService", ['$http', function($http) {
    var myPhonePlanService = {};

    myPhonePlanService.getDetails = function(callback) {
        $http.get(properties.serviceEndpoints.paym.getCCAPhonePlan)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return myPhonePlanService;
}]);