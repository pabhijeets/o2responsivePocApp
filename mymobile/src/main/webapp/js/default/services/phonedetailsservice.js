angular.module("phoneDetailsService", [])
.service("phoneDetailsService", ['$http', function($http) {
    var phoneDetailsService = {};

    phoneDetailsService.getSummary = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.common.phoneDetails)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return phoneDetailsService;
}]);