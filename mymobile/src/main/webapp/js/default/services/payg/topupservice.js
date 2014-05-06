angular.module("topupService", [])
.service("topupService", ['$http', function($http) {
    var topupService = {};

    topupService.getHistory = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.payg.topuphistory)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return topupService;
}]);